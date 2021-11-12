import React, { Component } from 'react'
import {
  View,
  Animated,
  LayoutChangeEvent,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  LayoutAnimation,
  StyleSheet,
} from 'react-native'
import { getInitialState } from './helpers/getInitialState'
import { PropsType, StateProps, ToastType } from './types'
import { Info } from './ToastVariants/Info'
import { initialWindowMetrics } from 'react-native-safe-area-context'

const IsIOS = Platform.OS === 'ios'

const initialState: ToastType = {
  type: 'info',
  title: '',
  message: '',
  autoHide: true,
  closeIcon: false,
  leftIcon: null,
  toastId: null,
  doubleClick: false,
  doubleClickCallback: () => ({}),
  duration: 2000,
}

export class Toast extends Component<PropsType, StateProps> {
  static _ref: any = null
  timer: NodeJS.Timeout | null

  static setRef(ref: unknown): void {
    Toast._ref = ref
  }

  static getRef(): void {
    return Toast._ref
  }

  static clearRef(): void {
    Toast._ref = null
  }

  static show(options: ToastType): void {
    Toast._ref?.show(options)
  }

  static hide(): void {
    Toast._ref.hide()
  }

  constructor(props: PropsType) {
    super(props)
    this._setState = this._setState.bind(this)
    this.timer = null
    this.startTimer = this.startTimer.bind(this)
    this.animate = this.animate.bind(this)
    this.hide = this.hide.bind(this)
    this.show = this.show.bind(this)
    this.onLayout = this.onLayout.bind(this)

    this.state = {
      inProgress: false,
      isVisible: false,
      animation: new Animated.Value(0),
      ...getInitialState(initialState),
    }
  }

  async hide(): Promise<void> {
    await this._setState((prevState: StateProps) => ({
      ...prevState,
      inProgress: true,
      countDoubleClick: 0,
    }))
    this.clearTimer()
    await this.animateHide()

    await this._setState((prevState: StateProps) => ({
      ...prevState,
      isVisible: false,
      inProgress: false,
    }))

    const { onHide } = this.state
    if (onHide) {
      this.animateHide()
    }
  }

  async show(options: ToastType): Promise<void> {
    if (this.state.toastId && this.state.toastId === options.toastId) {
      await this._setState((prevState: StateProps) => ({
        ...prevState,
        inProgress: true,
        ...options,
      }))

      this.animateShow()
      this.clearTimer()

      const { autoHide, onShow } = this.state
      if (autoHide) {
        this.startTimer()
      }

      if (onShow) {
        onShow()
      }
    } else {
      if (this.state.toastId) {
        await this.hide()
      }

      await this._setState((prevState: StateProps) => ({
        ...prevState,
        ...getInitialState(initialState), // Reset layout, and other props
        // * if first toast has 3s duration, and second has default, we should reset prevState to initial state
        height: prevState.height,
        inProgress: true,
        ...options,
      }))

      this.animateShow()

      await this._setState((prevState: StateProps) => ({
        ...prevState,
        isVisible: true,
        inProgress: false,
      }))

      this.clearTimer()

      const { autoHide, onShow } = this.state

      if (autoHide) {
        this.startTimer()
      }

      if (onShow) {
        onShow()
      }
    }
  }

  startTimer(): void {
    const { duration } = this.state

    if (this.state.doubleClick) {
      this._setState((prevState: StateProps) => ({
        ...prevState,
        countDoubleClick: prevState.countDoubleClick ? prevState.countDoubleClick + 1 : 1,
      }))

      if (this.state.countDoubleClick >= 2) {
        if (this.state.doubleClickCallback) {
          this.state.doubleClickCallback()
        }
      }
    }

    this.timer = setTimeout(() => this.hide(), duration)
  }

  clearTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = null
  }

  _setState(reducer: (c: StateProps) => StateProps): Promise<void> {
    return new Promise<void>((resolve) => this.setState(reducer, () => resolve()))
  }

  onLayout(e: LayoutChangeEvent): void {
    this.setState({ height: e.nativeEvent.layout.height })
  }

  animateShow = (): ReturnType<typeof setTimeout> => {
    if (Platform.OS === 'ios') {
      LayoutAnimation.configureNext(LayoutAnimation.create(0, 'linear', 'opacity')) // disable LayoutAnimation om IOS. on Android work normally
    }

    return setTimeout(() => {
      const { animateFrom, type } = this.state
      const wh = Dimensions.get('window').height

      const extraOffset =
        type === 'waitingConnection' && !IsIOS
          ? 5
          : type === 'waitingConnection' && IsIOS
          ? initialWindowMetrics?.insets.top || 30
          : 30

      const height = this.state.height + extraOffset

      let value = height + 50 > wh ? wh - 25 : height

      if (animateFrom === 'bottom') {
        value = -value
      }

      this.animate({ toValue: value, type: 'show' })
    }, 100)
  }

  animateHide = (): Promise<void> => {
    if (Platform.OS === 'ios') {
      LayoutAnimation.configureNext(LayoutAnimation.create(0, 'linear', 'opacity')) // disable LayoutAnimation om IOS. on Android work normally
    }

    return this.animate({ toValue: 0, type: 'hide' })
  }

  animate({ toValue, type }: { toValue: number; type: 'hide' | 'show' }): Promise<void> {
    const { animation } = this.state
    return new Promise((resolve) => {
      if (type === 'show') {
        const config = {
          toValue,
          useNativeDriver: true,
          speed: 30,
        }
        Animated.spring(animation, config).start(() => resolve())
      }

      if (type === 'hide') {
        const config = {
          toValue,
          useNativeDriver: true,
          duration: 200,
        }
        Animated.timing(animation, config).start(({ finished }) => {
          resolve()
          if (finished) {
            this.setState((prevState) => ({
              inProgress: false,
              isVisible: false,
              animation: new Animated.Value(0),
              ...getInitialState(initialState),
            }))
          }
        })
      }
    })
  }

  render(): JSX.Element {
    const { animateFrom, type } = this.state
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          position: 'absolute',
          bottom: animateFrom === 'bottom' ? 0 : undefined,
          width: '100%',
        }}
      >
        <View>
          <View style={[styles.parent, animateFrom === 'bottom' && { bottom: 0 }]}>
            {type === 'info' ? <Info onLayout={this.onLayout} state={this.state} /> : null}
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  parent: {
    position: 'absolute',
    // bottom: 0,
    height: 0,
    width: '100%',
    paddingHorizontal: 15,
  },
  anim: {
    // bottom: 0,
    position: 'absolute',
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: 'center',
  },
})
