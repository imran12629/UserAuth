import React from 'react';
import { showMessage } from 'react-native-flash-message';
import { StyleSheet, View, Text } from 'react-native';
import { moderateScale, scale, scaleFont, verticalScale } from '../../utils/scalingFunctions';
import { COLORS } from '../../utils/constants';


export type MessageType = 'success' | 'error' | 'info' | 'warning';

export const getFlashMessageBackgroundColor = (type: MessageType) => {
  let backgroundColor: string;
  switch (type) {
    case 'success':
      backgroundColor = COLORS.lightGreen;
      break;
    case 'error':
      backgroundColor = COLORS.lightRed;
      break;
    default:
      backgroundColor = COLORS.lightGray;
  }
  return backgroundColor;
};

export const getFlashMessageBorderColor = (type: MessageType) => {
  let backgroundColor: string;
  switch (type) {
    case 'success':
      backgroundColor = COLORS.green;
      break;
    case 'error':
      backgroundColor = COLORS.red;
      break;
    default:
      backgroundColor = COLORS.darkGray;
  }
  return backgroundColor;
};

export const FlashMessageComponent = {
  show: (
    type: MessageType,
    message: string,
    position: 'top' | 'bottom' = 'top',
  ) => {
    showMessage({
      message: '',
      type: 'default',
      duration: 3000,
      position: position,
      hideStatusBar: false,
      style: {
        marginVertical: 0,
        paddingVertical: 0,
        backgroundColor: 'transparent',
      },
      renderCustomContent: () => (
        <View
          style={[
            styles.container,
            position === 'top'
              ? { marginTop: 20, marginBottom: 0 }
              : { marginBottom: 60, marginTop: 0 },
          ]}>
          <View style={[styles.toastContainer,{backgroundColor:getFlashMessageBackgroundColor(type),borderColor:getFlashMessageBorderColor(type)}]}>
            <Text style={[styles.message]}>{message}</Text>
          </View>
        </View>
      ),
    });
  },
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: scale(16),
  },
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(8),
    borderRadius: moderateScale(6),
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    minWidth: scale(150),
    borderWidth:1
    // maxWidth: '90%',
  },
  icon: {
    width: scale(30),
    height: verticalScale(30),
    tintColor: COLORS.white,
    marginRight: scale(4),
  },
  message: {
    color: COLORS.black,
    // fontFamily: fontFamily.ABCDiatype_Medium,
    fontSize: scaleFont(14),
    paddingHorizontal:10
  },
});
