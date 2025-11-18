import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {COLORS} from '../../utils/constants';
import {scaleFont} from '../../utils/scalingFunctions';

interface ClearButtonProps {
  title: string;
  LeftIcon?: any;
  RightIcon?: any;
  onPress: () => void;
  disabled?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const ClearButton: React.FC<ClearButtonProps> = ({
  title,
  LeftIcon,
  RightIcon,
  onPress,
  disabled = false,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, buttonStyle]}>
      {LeftIcon && <LeftIcon />}
      <Text
        style={[
          styles.title,
          {color: disabled ? COLORS.darkGray : COLORS.cyanBlue},
          textStyle,
        ]}>
        {title}
      </Text>
      {RightIcon && <RightIcon />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // flex:1,
    flexDirection: 'row',
    // backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    marginHorizontal: 4,
    color: COLORS.cyanBlue,
    fontWeight: '600',
    fontSize: scaleFont(12),
  },
});

export default ClearButton;
