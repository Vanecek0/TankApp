
import { Colors } from "@/constants/Colors"
import { useTheme } from "@/theme/ThemeProvider"
import { spacing } from "@/utils/SizeScaling"
import type React from "react"
import { createContext, useContext, useState } from "react"
import { Modal, View, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native"

type ModalContextType = {
  showModal: (component: React.ReactNode) => void
  hideModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}

export const ModalProvider = ({ children }: any) => {
  const [modalContent, setModalContent] = useState<React.ReactNode>(null)
  const { isDark } = useTheme()

  const showModal = (component: React.ReactNode) => setModalContent(component)
  const hideModal = () => setModalContent(null)

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalContent && (
        <Modal animationType="fade" transparent={true} visible={!!modalContent} onRequestClose={hideModal}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <TouchableWithoutFeedback onPress={hideModal}>
              <View
                style={[
                  styles.backdrop,
                  { backgroundColor: isDark ? "rgba(0, 0, 0, 0.75)" : "rgba(0, 0, 0, 0.5)" },
                ]}
              />
            </TouchableWithoutFeedback>

            <View style={styles.modalContainer}>
              <View
                style={[
                  styles.modalContent,
                  {
                    backgroundColor: isDark ? Colors.dark.secondary : Colors.light.secondary,
                    ...spacing.borderRadius(12),
                  },
                ]}
              >
                {modalContent}
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
