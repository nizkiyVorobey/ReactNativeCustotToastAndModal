import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from '../../Button'
import { ModalComponentProps } from '../type'

export const InfoModal: React.FC<ModalComponentProps> = (props) => {
  const { pressOk, title, description, textOk = 'yes', hideModal } = props

  const handlePressOk = pressOk ?? hideModal

  return (
    <View style={{}}>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}

      <View style={styles.buttonWrapper}>
        <Button text={textOk} wrapperStyle={{ minWidth: 90 }} onPress={handlePressOk} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  description: {
    paddingTop: 10,
    textAlign: 'center',
  },
  buttonWrapper: {
    paddingTop: 20,
    alignItems: 'center',
  },
})
