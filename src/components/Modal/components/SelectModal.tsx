import React, { useEffect, useRef } from 'react'
import { Animated, BackHandler, StyleSheet, TouchableOpacity, View } from 'react-native'
import CloseIcon from '../../../assets/img/close.svg'
import { ConfirmModal } from './ConfirmModal'
import { InfoModal } from './InfoModal'
import { ModalComponentProps } from '../type'

export const SelectModal: React.FC<ModalComponentProps> = (props) => {
  const { type = 'info', animationType = 'none', onRequestClose, closeIcon } = props
  const opacity = useRef(new Animated.Value(animationType === 'fade' ? 0 : 1)).current
  const scale = useRef(new Animated.Value(animationType === 'scale' ? 0 : 1)).current

  const handleRequestClose = onRequestClose ? onRequestClose : props.hideModal

  useEffect(() => {
    const backAction = () => {
      handleRequestClose()
      return true
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

    if (animationType === 'fade') {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start()
    } else if (animationType === 'scale') {
      Animated.timing(scale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start()
    }

    return () => backHandler.remove()
  }, [])

  const currentMode = () => {
    if (type === 'confirm') {
      return <ConfirmModal {...props} hideModal={props.hideModal} />
    }

    return <InfoModal {...props} hideModal={props.hideModal} />
  }

  return (
    <Animated.View style={[styles.wrapper, { backgroundColor: 'rgba(255,255,255, 0.7)', opacity }]}>
      <Animated.View style={{ transform: [{ scale }] }}>
        {closeIcon && (
          <TouchableOpacity
            style={styles.closeIconWrapper}
            onPress={props.hideModal}
            hitSlop={{
              bottom: 20,
              left: 20,
              right: 20,
              top: 20,
            }}
          >
            <CloseIcon width={24} height={24} color={'4D4D4D'} />
          </TouchableOpacity>
        )}

        <View style={[styles.content, { backgroundColor: '#ffffff' }]}>{currentMode()}</View>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: 300,
    padding: 30,
    borderRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  closeIconWrapper: {
    position: 'absolute',
    elevation: 10,
    zIndex: 1,
    right: 10,
    top: 10,
  },
})
