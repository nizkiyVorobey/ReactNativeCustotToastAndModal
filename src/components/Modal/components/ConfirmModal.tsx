import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from '../../Button'
import { ModalComponentProps } from '../type'

export const ConfirmModal: React.FC<ModalComponentProps> = (props) => {
  const {
    pressOk,
    pressCancel,
    title,
    description,
    textOk = 'yes',
    textCancel = 'no',
    hideModal,
  } = props

  const handlePressCancel = pressCancel ?? hideModal

  return (
    <View>
      <Text style={styes.title}>{title}</Text>

      {description && <Text style={styes.description}>{description}</Text>}

      <View style={styes.buttonWrapper}>
        <Button text={textOk} wrapperStyle={{ minWidth: 90 }} onPress={pressOk} />
        <Button
          text={textCancel}
          textStyle={{ color: '#00AAF6' }}
          wrapperStyle={{
            backgroundColor: '#fff',
            borderColor: '#00AAF6',
            borderWidth: 1,
            width: 90,
          }}
          onPress={handlePressCancel}
        />
      </View>
    </View>
  )
}

const styes = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    paddingTop: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
