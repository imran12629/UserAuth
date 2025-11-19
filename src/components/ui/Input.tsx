import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TextStyle,
  Text,
  ViewStyle,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { COLORS } from '../../utils/constants';
import {
  moderateScale,
  scale,
  scaleFont,
  verticalScale,
} from '../../utils/scalingFunctions';

export interface InputRef {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
  setValue: (val: string) => void;
}

type Props = {
  label?: string;
  otherStyle?: ViewStyle;
  errorMessage?: string;
  status?: 'default' | 'error' | 'success';
  LeftIcon?: any;
  RightIcon?: any;
  onPress?: () => void;
  secureTextEntry?: boolean;
} & React.ComponentProps<typeof TextInput>;

const Input = forwardRef<InputRef, Props>((props, ref) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const inputRef = useRef<TextInput>(null);
  const [hidePassword, setHidePassword] = useState(props.secureTextEntry);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => inputRef.current?.clear(),
    getValue: () => props.value || '',
    setValue: (val: string) =>
      inputRef.current?.setNativeProps({ text: val }),
  }));

  const getBorderStyle = () => {
    if (props.errorMessage) return styles.errorBorder;
    if (props.status === 'success') return styles.successBorder;
    return styles.defaultBorder;
  };

  const togglePasswordVisibility = () => {
    setHidePassword(prev => !prev);
  };

  return (
    <View style={[styles.container, props.otherStyle]}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}

      <View
        style={[styles.inputWrapper, getBorderStyle()]}
        testID="input-wrapper"
      >
        <TextInput
          ref={inputRef}
          value={props.value}
          onChangeText={props.onChangeText}
          onBlur={props.onBlur}
          style={[
            styles.input,
            props.style as TextStyle,
            isLandscape ? { height: 48 } : null,
          ]}
          placeholderTextColor={COLORS.darkGray}
          editable={props.editable}
          {...props}
          secureTextEntry={hidePassword}
          testID={props.testID ?? "text-input"}
        />

        {props.secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            testID="password-toggle"
          >
            <Image
              source={
                !hidePassword
                  ? require('../../assets/icons/eye.png')
                  : require('../../assets/icons/eye-off.png')
              }
              style={styles.eye}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>

      {props.errorMessage ? (
        <Text style={styles.errorText}>{props.errorMessage}</Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  label: {
    fontSize: scaleFont(12),
    color: COLORS.darkGray,
    paddingBottom: verticalScale(4),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(8),
    backgroundColor: COLORS.smokegray,
    paddingRight: moderateScale(12),
    borderWidth: 1,
  },
  defaultBorder: {
    borderColor: COLORS.lightGray,
  },
  errorBorder: {
    borderColor: COLORS.red,
  },
  successBorder: {
    borderColor: COLORS.green,
  },
  input: {
    flex: 1,
    paddingHorizontal: scale(16),
    fontSize: scaleFont(14),
    color: COLORS.darkBlue,
    height: verticalScale(48),
  },
  eye: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  errorText: {
    marginTop: verticalScale(4),
    fontSize: scaleFont(11),
    color: COLORS.red,
  },
});

export default Input;
