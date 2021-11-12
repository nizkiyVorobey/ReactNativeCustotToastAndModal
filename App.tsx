/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { FC } from 'react'
import { SafeAreaView, Text, TouchableOpacity, useColorScheme, View } from 'react-native'

import { CustomModal } from './src/components/Modal/CustomModal'
import { Toast } from './src/components/Toast/Toast'
import { WaitingConnection } from './src/components/Toast/WaitingConnection'

type ShowToastProps = 'big' | 'small' | 'waitingConnection'

export const showToast = (type: ShowToastProps): void => {
  if (type === 'big') {
    Toast.show({
      type: 'info',
      message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but also the leap into electronic
      typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
      PageMaker including versions of Lorem Ipsum.
      XXXX
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but also the leap into electronic
      typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
      PageMaker including versions of Lorem Ipsum.
      YYYY
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but also the leap into electronic
      typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
      PageMaker including versions of Lorem Ipsum.
      YYYY
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but also the leap into electronic
      typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
      PageMaker including versions of Lorem Ipsum.
      `,
      toastId: '1',
    })
  } else if (type === 'waitingConnection') {
    WaitingConnection.show({
      type: 'waitingConnection',
      message: 'serverConnection',
      toastId: '2',
      animateFrom: 'top',
      autoHide: false,
      // duration: 10000,
    })
  } else if (type === 'small') {
    Toast.show({
      type: 'info',
      message: 'Hello world',
      toastId: '3',
    })
  }
}

function openModal() {
  CustomModal.show({
    type: 'confirm',
    animationType: 'fade',
    title: 'Title',
    description: 'descp',
    closeIcon: false,
    pressOk: () => {
      CustomModal.hide()
    },
  })
}

const App: FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'lightblue' }}>
      <SafeAreaView>
        <TouchableOpacity>
          <Text onPress={openModal}>Open toast</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={() => showToast('small')}>Open small toast</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text onPress={() => showToast('big')}>Open big toast</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text onPress={() => showToast('waitingConnection')}>Open waitingConnection toast</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <CustomModal ref={(ref: unknown) => CustomModal.setRef(ref)} />
      <Toast ref={(ref: unknown) => Toast.setRef(ref)} />
      <WaitingConnection ref={(ref: unknown) => WaitingConnection.setRef(ref)} />
    </View>
  )
}

export default App
