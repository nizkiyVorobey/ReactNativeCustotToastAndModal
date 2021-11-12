import React from 'react'
import { Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native'

type ButtonType = {
  text: string
  wrapperStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  disabled?: boolean
  onPress?: () => void
}

export const Button: React.FC<ButtonType> = (props) => {
  const { text, wrapperStyle, textStyle, onPress, disabled } = props

  return (
    <TouchableOpacity
      style={[styles.button, { opacity: disabled ? 0.5 : 1 }, wrapperStyle]}
      onPress={onPress}
      disabled={disabled}
      hitSlop={{
        bottom: 10,
        left: 10,
        right: 10,
        top: 10,
      }}
    >
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00AAF6',
    borderRadius: 30,
    paddingHorizontal: 21,
    paddingVertical: 15,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 15,
  },
})
