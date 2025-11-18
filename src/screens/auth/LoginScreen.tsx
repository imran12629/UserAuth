import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Title from '../../components/ui/Title';
import ClearButton from '../../components/ui/ClearButton';
import { useAuth } from '../../hooks/useAuth';
import { COLORS, BUTTON, LABELS, ERROR } from '../../utils/constants';
import {
  scale,
  scaleFont,
  verticalScale,
  moderateScale,
} from '../../utils/scalingFunctions';
import { ROUTE } from '../../navigation/routes';
import { useStackNavigation } from '../../hooks/useAppNavigation';
import { FlashMessageComponent } from '../../components/ui/FlashMessage';
import AppScreen from '../AppScreen';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email(ERROR.email.invalid).required(ERROR.required.email),
  password: Yup.string()
    .min(6, ERROR.password.minLength)
    .required(ERROR.required.password),
});

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const { login } = useAuth();
  const navigation = useStackNavigation();


  const onSubmit = useCallback(
    async (
      values: LoginFormValues,
      { setSubmitting }: FormikHelpers<LoginFormValues>,
    ) => {
      try {
        const response = await login(values.email, values.password);

        if (!response.status) {
          FlashMessageComponent.show('error', response.message);
          setSubmitting(false);
          return;
        }

        FlashMessageComponent.show('success', response.message);
      } catch (err) {
        console.log(err);
      } finally {
        setSubmitting(false);
      }
    },
    [login],
  );

  const navigate=() => navigation.navigate(ROUTE.SignUp)

  return (
    <AppScreen>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <ScrollView contentContainerStyle={styles.container}>
            <View>
              <Title
                title={LABELS.sign_in_to_your_account}
                subtitle={LABELS.welcome_back}
              />

              <View>
                <Input
                  placeholder={LABELS.email}
                  inputMode="email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  errorMessage={touched.email ? errors.email : ''}
                />

                <Input
                  placeholder={LABELS.password}
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  errorMessage={touched.password ? errors.password : ''}
                />
              </View>
            </View>

            <View style={styles.btnContainer}>
              <Button
                title={BUTTON.login}
                onPress={handleSubmit}
                loading={isSubmitting}
              />

              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  {LABELS.dont_have_an_account}
                </Text>

                <ClearButton
                  title={BUTTON.go_to_sign_up}
                  onPress={navigate}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: scale(24),
    justifyContent: 'space-between',
    marginTop: verticalScale(40),
  },
  btnContainer: {
    gap: moderateScale(8),
    marginBottom: verticalScale(8),
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.black,
    fontSize: scaleFont(12),
  },
});

export default LoginScreen;
