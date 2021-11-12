import { Toast } from '../src/components/Toast/Toast'
import { WaitingConnection } from '../src/components/Toast/WaitingConnection'
import { translate } from '../src/translations/helpers/translate'

type Props = 'big' | 'small' | 'waitingConnection'

export const showToast = (type: Props): void => {
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
      `,
      toastId: '1',
    })
  } else if (type === 'waitingConnection') {
    WaitingConnection.show({
      type: 'waitingConnection',
      message: translate('serverConnection'),
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
