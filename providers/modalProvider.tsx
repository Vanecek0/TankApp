import React, { createContext, useContext, useState } from 'react';
import { Modal, View, StyleSheet } from 'react-native';

const ModalContext = createContext(undefined);
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);

  const showModal = (component) => setModalContent(() => component);
  const hideModal = () => setModalContent(null);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalContent && (
        <Modal animationType="slide" transparent={true} onRequestClose={hideModal}>
          <View style={styles.overlay}>
            <View style={styles.container}>
              {modalContent}
            </View>
          </View>
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
});