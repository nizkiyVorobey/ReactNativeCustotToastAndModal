import { Animated, View } from 'react-native'

export type ToastType = {
  type: 'info' | 'waitingConnection'
  title?: string
  message: string
  toastId: null | string
  autoHide?: boolean
  closeIcon?: boolean
  leftIcon?: null | View
  duration?: number
  doubleClick?: boolean
  animateFrom?: 'top' | 'bottom'
  doubleClickCallback?: () => void
  onPress?: () => void
  onShow?: () => void
  onHide?: () => void
}

export type GetInitialStateType = ToastType & {
  height: number
  countDoubleClick: number
}

export type StateProps = ToastType & {
  inProgress: boolean
  isVisible: boolean
  animation: Animated.Value
  countDoubleClick: number
  height: number
}

export type PropsType = {
  ref: (c: unknown) => void
}
