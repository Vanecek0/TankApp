import { Colors } from '@/constants/Colors';
import { useTheme } from '@/theme/ThemeProvider';
import { spacing } from '@/utils/SizeScaling';
import React, { createContext, useContext, useState } from 'react';
import { Modal, View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

type ModalContextType = {
  showModal: (component: React.ReactNode) => void;
  hideModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }: any) => {
  const [modalContent, setModalContent] = useState(null);

  const showModal = (component: any) => setModalContent(() => component);
  const hideModal = () => setModalContent(null);
  const { isDark } = useTheme();

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalContent && (
        <Modal className='flex-1 justify-center items-center' animationType="fade" transparent={true} onRequestClose={hideModal}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
            <View onTouchEnd={hideModal} className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center' style={{ backgroundColor: isDark ? '#000000bf' : "#ffffffbf" }}></View>
            <View className='flex-1 justify-center items-center relative'>
              <View style={{width: '85%', backgroundColor: isDark ? Colors.dark.secondary : Colors.light.secondary, ...spacing.borderRadius(12) }}>
                {modalContent}
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}
    </ModalContext.Provider>
  );
};