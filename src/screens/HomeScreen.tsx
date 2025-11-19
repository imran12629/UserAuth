import React, { useContext } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { BUTTON, COLORS, LABELS } from '../utils/constants';
import { scale, scaleFont, verticalScale } from '../utils/scalingFunctions';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/ui/Button';
import AppScreen from './AppScreen';

const HomeScreen: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
console.log("HomeScreen",user)
  return (
    <AppScreen>
      <View style={styles.container}>
        <View>
          <Text style={styles.welcomeText}>{LABELS.welcome}</Text>
          <Text style={styles.nameText}>{user?.name}</Text>

          <Text style={styles.emailLabel}>{LABELS.email}</Text>
          <Text style={styles.emailText}>{user?.email}</Text>
        </View>

        <View style={styles.bottomContainer}>
          <Button
            title={BUTTON.logout}
            onPress={logout}
            buttonStyle={styles.btnStyle}
          />
        </View>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: verticalScale(40),
    paddingHorizontal: scale(20),
    justifyContent: 'space-between',
  },
  welcomeText: {
    color: COLORS.black ,
    fontSize: scaleFont(22),
    fontWeight: 'bold',
  },
  nameText: {
    color: COLORS.darkBlue,
    fontSize: scaleFont(16),
    marginTop: verticalScale(4),
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  emailLabel: {
    color: COLORS.black,
    fontSize: scaleFont(14),
    marginTop: verticalScale(20),
  },
  emailText: {
    color: COLORS.darkGray,
    fontSize: scaleFont(14),
    marginTop: verticalScale(4),
  },
  bottomContainer: {
    alignItems: 'center',
  },

  btnStyle: {
    width: scale(140),
  },
});

export default HomeScreen;
