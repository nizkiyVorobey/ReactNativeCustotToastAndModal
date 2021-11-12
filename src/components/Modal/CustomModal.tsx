import React from 'react'
import { SelectModal } from './components/SelectModal'
import { ModalProps, ModalState, PropsType } from './type'

export class CustomModal extends React.Component<PropsType, ModalState> {
  static _ref: any = null

  static setRef(ref: unknown): void {
    CustomModal._ref = ref
  }

  static getRef(): void {
    return CustomModal._ref
  }

  static clearRef(): void {
    CustomModal._ref = null
  }

  static show(options: ModalProps): void {
    CustomModal._ref?.show(options)
  }

  static hide(): void {
    CustomModal._ref.hide()
  }

  constructor(props: PropsType) {
    super(props)
    this.hide = this.hide.bind(this)
    this.show = this.show.bind(this)
    this.state = {
      open: false,
      options: null,
    }
  }

  show(options: ModalProps): void {
    this.setState({ open: true, options })
  }

  hide(): void {
    this.setState({ open: false, options: null })
  }

  render(): JSX.Element | null {
    const { open, options } = this.state
    return open && options ? <SelectModal {...options} hideModal={this.hide} /> : null
  }
}
