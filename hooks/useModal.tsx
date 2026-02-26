import { ThemeColors as Colors } from "@/constants/Colors"
import { useTheme } from "@/theme/ThemeProvider"
import { spacing } from "@/utils/SizeScaling"
import type React from "react"
import { createContext, useContext, useState } from "react"
import {
  Modal,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native"

type ModalContextType = {
  showModal: (Component: React.FC<any>, props?: Record<string, any>) => void
  hideModal: () => void
  showPlainModal: (Component: React.FC<any>, props?: Record<string, any>) => void
  hidePlainModal: () => void
  showSuperModal: (Component: React.FC<any>, props?: Record<string, any>) => void
  hideSuperModal: () => void
  hideAllModals: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [PlainModalComponent, setPlainModalComponent] = useState<React.FC<any> | null>(null)
  const [plainModalProps, setPlainModalProps] = useState<Record<string, any>>({})
  const [ModalComponent, setModalComponent] = useState<React.FC<any> | null>(null)
  const [modalProps, setModalProps] = useState<Record<string, any>>({})
  const [SuperModalComponent, setSuperModalComponent] = useState<React.FC<any> | null>(null)
  const [superModalProps, setSuperModalProps] = useState<Record<string, any>>({})

  const { isDark } = useTheme()

  const showModal = (Component: React.FC<any>, props: Record<string, any> = {}) => {
    setModalComponent(() => Component)
    setModalProps(props)
  }

  const showPlainModal = (Component: React.FC<any>, props: Record<string, any> = {}) => {
    setPlainModalComponent(() => Component)
    setPlainModalProps(props)
  }

  const showSuperModal = (Component: React.FC<any>, props: Record<string, any> = {}) => {
    setSuperModalComponent(() => Component)
    setSuperModalProps(props)
  }

  const hideModal = () => {
    setModalComponent(null)
    setModalProps({})
  }

  const hidePlainModal = () => {
    setPlainModalComponent(null)
    setPlainModalProps({})
  }

  const hideSuperModal = () => {
    setSuperModalComponent(null)
    setSuperModalProps({})
  }

  const hideAllModals = () => {
    setTimeout(() => {
      hideModal()
      hidePlainModal()
      hideSuperModal()
    }, 0)
  }

  return (
    <ModalContext.Provider value={{ showModal, hideModal, showPlainModal, hidePlainModal, showSuperModal, hideSuperModal, hideAllModals }}>
      {children}

      {PlainModalComponent && (
        <Modal animationType="fade" transparent visible onRequestClose={hideModal}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <TouchableWithoutFeedback onPress={hidePlainModal}>
              <View style={[styles.backdrop, { zIndex: 1 }]} />
            </TouchableWithoutFeedback>
            <View>
              <PlainModalComponent {...plainModalProps} />
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}

      {ModalComponent && (
        <Modal animationType="fade" transparent visible onRequestClose={hideModal}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <TouchableWithoutFeedback onPress={hideModal}>
              <View style={[styles.backdrop, { backgroundColor: isDark ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.5)" }]} />
            </TouchableWithoutFeedback>

            <View style={styles.modalContainer}>
              <View style={[styles.modalContent, { backgroundColor: isDark ? Colors.background.dark : Colors.background.light, ...spacing.borderRadius(12) }]}>
                <ModalComponent {...modalProps} />
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}

      {SuperModalComponent && (
        <Modal animationType="fade" transparent visible onRequestClose={hideSuperModal}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={StyleSheet.absoluteFill}>
            <TouchableWithoutFeedback onPress={hideSuperModal}>
              <View style={[styles.backdrop, { backgroundColor: "rgba(0,0,0,0.85)", zIndex: 9999 }]} />
            </TouchableWithoutFeedback>

            <View style={[styles.modalContainer, { zIndex: 10000 }]}>
              <View style={[styles.modalContent, { backgroundColor: isDark ? Colors.background.surface.dark : Colors.background.surface.light, ...spacing.borderRadius(12) }]}>
                <SuperModalComponent {...superModalProps} />
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}
    </ModalContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    width: "100%",
    maxHeight: "85%",
  },
})