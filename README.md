Installation & Setup

Install dependencies
- npm install


Install Pods (iOS)
- cd ios
- pod install
- cd ..

Run the App
For iOS:
- npx react-native run-ios

For Android:
- npx react-native run-android

React Native Authentication App

- A simple and clean React Native Authentication App built using:

- React Native 0.82

- React Context API

- React Navigation

- AsyncStorage (for storing user details + encrypted password)

- Reusable UI components

- TypeScript

This app demonstrates a modern authentication flow using Context, custom hooks, safe-area layout, and structured folder organization.


Features Implemented

Authentication

- Login with email + password

- Signup with name, email, and password

- Secure password storage using encryption

- Stores user data using AsyncStorage

- Auto-login on app restart

- Logout with context reset

AuthContext (Global State)

- login() function

- signup() function

- logout() function

- Stores authenticated user


Screens

- Login Screen

- Signup Screen

- Home Screen (Shows user details and logut button)

- AppScreen (Reusable parent layout with SafeArea + KeyboardAvoidingView)

Components

- Reusable Input component

- Reusable Button component

- Scaling utilities: scale, verticalScale, scaleFont
