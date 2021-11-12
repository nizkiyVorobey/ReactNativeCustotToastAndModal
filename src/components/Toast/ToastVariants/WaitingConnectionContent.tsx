import React, { FC, useEffect, useState } from 'react'
import {
  Text,
  Animated,
  Dimensions,
  ScrollView,
  View,
  LayoutChangeEvent,
  StyleSheet,
} from 'react-native'
import { ToastType } from '../types'

type WaitingConnectionProps = {
  onLayout: (e: LayoutChangeEvent) => void
  state: ToastType & {
    inProgress: boolean
    isVisible: boolean
    animation: Animated.Value
  }
}

export const WaitingConnectionContent: FC<WaitingConnectionProps> = (props) => {
  const { onLayout, state } = props

  const [dots, setDots] = useState('.')

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevState) => {
        if (prevState === '...') {
          return '.'
        } else {
          return prevState + '.'
        }
      })
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <Animated.View
      onLayout={onLayout}
      style={[
        styles.anim,
        {
          transform: [{ translateY: state.animation }],
          maxHeight: Dimensions.get('window').height - 50,
          paddingHorizontal: state.message.length ? 10 : 0,
          bottom: 0,
        },
        state.animateFrom === 'bottom' && { bottom: undefined },
      ]}
    >
      <ScrollView bounces={false}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 12, color: '#0DC143' }}>{state.message}</Text>
          <Text style={{ fontSize: 12, color: '#0DC143', width: 15 }}>{dots}</Text>
        </View>
      </ScrollView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  anim: {
    position: 'absolute',
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: 'center',
  },
})
