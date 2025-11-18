import React, {useCallback, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar, I18nManager} from 'react-native';

import {COLORS} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import {scale, scaleFont, verticalScale} from '../../utils/scalingFunctions';


interface Props {
  backButton?: boolean;
  onPress?: () => void;
  title?: string;
  RightIcon?: any;
  handleIconPress?: () => void;
}

const Header: React.FC<Props> = ({
  backButton = true,
  onPress,
  title,
  RightIcon,
  handleIconPress,
}) => {
  const navigation = useNavigation();
 
  const backPress=() => navigation.goBack()

  return (
    <View
    style={[
      styles.container,
      { justifyContent: !backButton ? 'flex-end' : 'space-between' },
    ]}
  >
    {backButton && (
      <View style={[styles.titleContainer]}>
        <TouchableOpacity onPress={onPress ?? backPress}>
         <Text>back</Text>
        </TouchableOpacity>
        <Text style={[styles.title]}>{title}</Text>
      </View>
    )}
  
  
    {RightIcon && (
      <TouchableOpacity
        style={[styles.languageSelector]}
        onPress={handleIconPress}
      >
        <RightIcon />
      </TouchableOpacity>
    )}
  
  </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    // justifyContent: 'space-between',
    // alignItems: 'center',
  width:"100%",
    borderBottomWidth: 0.5,
    borderColor: COLORS.lighterGray,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  titleContainer: { 
    alignItems: 'center',
    gap: 16,
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  langText: {
    fontSize: scaleFont(14),
    marginLeft: scale(4),
    fontWeight: '500',
  },
  title: {
    fontWeight: '500',
    fontSize: scaleFont(16),
  },
});

export default Header;
