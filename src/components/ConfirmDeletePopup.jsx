import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import styles from '../styles/ConfirmDeletePopupStyles';

const ConfirmDeletePopup = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>Delete this task?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onConfirm} style={styles.yesButton}>
              <Text style={styles.yesText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={styles.noButton}>
              <Text style={styles.noText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDeletePopup;
