import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../../utils/constants';
import { scaleFont, verticalScale } from '../../utils/scalingFunctions';

interface HeaderSectionProps {
  title: string;
  subtitle?: string;
  viewStyle?:ViewStyle;
  textStyle?:TextStyle;
  subtitleStyle?:TextStyle
}

const Title: React.FC<HeaderSectionProps> = ({
  title,
  subtitle,
 viewStyle,
 textStyle,
 subtitleStyle
}) => {
  return (
    <View style={[styles.container,viewStyle]}>
      <Text style={[styles.title,textStyle]}>{title}</Text>
      <Text style={[styles.subtitle,subtitleStyle]}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom:verticalScale(32),
    gap:4
  },
  title: {
    fontSize: scaleFont(21),
    fontWeight: 'bold',
    color: COLORS.darkBlue,
  },
  subtitle: {
    fontSize:scaleFont(14),
    color: COLORS.darkGray,
   
  },
});

export default Title;
