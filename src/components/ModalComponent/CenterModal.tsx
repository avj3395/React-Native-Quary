import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import Modal from 'react-native-modal';
const CenterModal = ({modalVisible, onClose, ...props}: any) => {
  return (
    <Modal
      avoidKeyboard={true}
      isVisible={modalVisible}
      swipeDirection={['down']}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      {...props.modalStyle}
      {...props}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 5,
          }}>
          {props.children}
        </View>
      </View>
    </Modal>
  );
};

export default CenterModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
