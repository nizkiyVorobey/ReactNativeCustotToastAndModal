export type ModalProps = {
  type?: 'info' | 'confirm'
  animationType?: 'none' | 'fade' | 'scale'
  onRequestClose?: () => void
  title: string
  description?: string
  textOk?: string
  textCancel?: string
  closeIcon?: boolean
  pressOk?: () => void
  pressCancel?: () => void
}

export type ModalComponentProps = ModalProps & { hideModal: () => void }

export type ModalState = {
  options: ModalProps | null
  open: boolean
}

export type PropsType = {
  ref: (c: unknown) => void
}
