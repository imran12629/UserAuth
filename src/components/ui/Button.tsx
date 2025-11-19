import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { COLORS } from '../../utils/constants';
import {
  moderateScale,
  scaleFont,
  verticalScale,
} from '../../utils/scalingFunctions';

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  buttonStyle,
  textStyle,
  loading = false,
}) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        disabled && styles.disabled,
        buttonStyle,
        isLandscape ? { height: 48 } : null,
      ]}
    >
      <View style={styles.btnContainer}>
        {loading ? (
          <ActivityIndicator testID='activity-indicator' color={COLORS.white} />
        ) : (
          <Text testID="button-title" style={[styles.text, textStyle]}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  button: {
    // flex:1,
    backgroundColor: COLORS.darkBlue,
    // paddingVertical: 14,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(10),
    height: verticalScale(48),
  },
  text: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: scaleFont(14),
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Button;
