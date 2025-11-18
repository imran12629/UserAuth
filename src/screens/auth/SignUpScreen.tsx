import React, { useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Title from '../../components/ui/Title';
import ClearButton from '../../components/ui/ClearButton';

import { BUTTON, COLORS, ERROR, LABELS } from '../../utils/constants';
import { useStackNavigation } from '../../hooks/useAppNavigation';

import {
  moderateScale,
  scale,
  scaleFont,
  verticalScale,
} from '../../utils/scalingFunctions';

import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/useAuth';
import { FlashMessageComponent } from '../../components/ui/FlashMessage';
import AppScreen from '../AppScreen';


const SignUpSchema = Yup.object().shape({
  name: Yup.string().required(ERROR.required.name),
  email: Yup.string().email(ERROR.email.invalid).required(ERROR.required.email),
  password: Yup.string()
    .min(6, ERROR.password.minLength)
    .required(ERROR.required.password),
});


interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
}


const SignUpScreen = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = useMemo(() => width > height, [width, height]);

  const navigation = useStackNavigation();
  const { signup, loading } = useAuth();

  const onSubmit = useCallback(
    async (
      values: SignUpFormValues,
      { setSubmitting }: FormikHelpers<SignUpFormValues>,
    ) => {
      const response = await signup(values);

      if (!response.status) {
        FlashMessageComponent.show('error', response.message);
        setSubmitting(false);
        return;
      }

      FlashMessageComponent.show('success', response.message);
      navigation.goBack();
      setSubmitting(false);
    },
    [signup, navigation],
  );

  const btnContainerStyle = useMemo(
    () => [
      styles.btnContainer,
      isLandscape && { paddingBottom: verticalScale(60) },
    ],
    [isLandscape],
  );

   const navigate=() => navigation.goBack()
  return (
    <AppScreen>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={SignUpSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          isSubmitting,
        }) => (
          <ScrollView contentContainerStyle={styles.container}>
            <View>
              <Title
                title={LABELS.sign_up_to_your_account}
                subtitle={LABELS.please_fill_the_details}
              />

              <View>
                <Input
                  placeholder={LABELS.name}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  errorMessage={touched.name ? errors.name : undefined}
                />

                <Input
                  placeholder={LABELS.email}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  inputMode="email"
                  errorMessage={touched.email ? errors.email : undefined}
                />

                <Input
                  placeholder={LABELS.password}
                  value={values.password}
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  errorMessage={touched.password ? errors.password : undefined}
                />
              </View>
            </View>

            <View style={btnContainerStyle}>
              <Button
                title={
                  loading || isSubmitting ? BUTTON.loading : BUTTON.signup
                }
                onPress={handleSubmit as any}
                disabled={loading || isSubmitting}
                loading={isSubmitting}
              />

              <View style={styles.textContainer}>
                <ClearButton
                  title={BUTTON.go_to_login}
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

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: scale(24),
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
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
