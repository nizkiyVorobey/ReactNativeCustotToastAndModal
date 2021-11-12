import React, { FC } from 'react'
import { Text, Animated, Dimensions, ScrollView, StyleSheet } from 'react-native'

type Props = {
  state: any
  onLayout: any
}

export const Info: FC<Props> = (props) => {
  const { onLayout, state } = props

  return (
    <Animated.View
      onLayout={onLayout}
      style={[
        styles.anim,
        {
          backgroundColor: '4D4D4D',
          transform: [{ translateY: state.animation }],
          maxHeight: Dimensions.get('window').height - 50,
          paddingHorizontal: state.message.length ? 10 : 0,
          bottom: 0,
        },
        state.animateFrom === 'bottom' && { bottom: undefined },
      ]}
    >
      <ScrollView bounces={false}>
        <Text style={{ color: '#f7fcff', fontSize: 15 }}>{state.message}</Text>
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
