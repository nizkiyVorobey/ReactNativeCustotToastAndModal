import { GetInitialStateType, ToastType } from '../types'

export const getInitialState = ({
  type = 'info',
  title = '',
  message = '',
  autoHide = true,
  closeIcon = false,
  leftIcon = null,
  toastId = null,
  doubleClick = false,
  doubleClickCallback = () => ({}),
  duration = 2000,
  animateFrom = 'bottom',
}: ToastType): GetInitialStateType => ({
  type,
  title,
  message,
  autoHide,
  closeIcon,
  leftIcon,
  toastId,
  duration,
  animateFrom,

  height: 0,

  doubleClick,
  doubleClickCallback,
  countDoubleClick: 0,

  onPress: undefined,
  onShow: undefined,
  onHide: undefined,
})
