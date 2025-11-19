import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import SignUpScreen from '../../src/screens/auth/SignUpScreen';
import { FlashMessageComponent } from '../../src/components/ui/FlashMessage';
import { BUTTON, ERROR, LABELS } from '../../src/utils/constants';

const mockSignup = jest.fn();
const mockGoBack = jest.fn();

jest.mock('../../src/hooks/useAuth', () => ({
  useAuth: () => ({
    signup: mockSignup,
    loading: false,
  }),
}));

jest.mock('../../src/hooks/useAppNavigation', () => ({
  useStackNavigation: () => ({
    goBack: mockGoBack,
  }),
}));

jest.mock('../../src/components/ui/FlashMessage', () => ({
  FlashMessageComponent: { show: jest.fn() },
}));

describe('SignUpScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all input fields', () => {
    const { getByPlaceholderText } = render(<SignUpScreen />);

    expect(getByPlaceholderText('Name')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  test('updates input values', () => {
    const { getByPlaceholderText } = render(<SignUpScreen />);

    fireEvent.changeText(getByPlaceholderText('Name'), 'Imran');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');

    expect(getByPlaceholderText('Name').props.value).toBe('Imran');
    expect(getByPlaceholderText('Email').props.value).toBe('test@example.com');
    expect(getByPlaceholderText('Password').props.value).toBe('123456');
  });

  test('shows validation error for empty fields', async () => {
    const { getByText } = render(<SignUpScreen />);

    act(() => {
        fireEvent.press(getByText(BUTTON.signup));
      });

    await waitFor(() => {
      expect(getByText(ERROR.required.name)).toBeTruthy();
      expect(getByText(ERROR.required.email)).toBeTruthy();
      expect(getByText(ERROR.required.password)).toBeTruthy();
    });
  });

  test('shows invalid email error', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUpScreen />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'wrongemail');
    
    act(() => {
        fireEvent.press(getByText(BUTTON.signup));
      });

    await waitFor(() => {
      expect(getByText(ERROR.email.invalid)).toBeTruthy();
    });
  });

  test('calls signup with correct values', async () => {
    mockSignup.mockResolvedValue({
      status: true,
      message: 'Registered',
    });

    const { getByPlaceholderText, getByText } = render(<SignUpScreen />);

    fireEvent.changeText(getByPlaceholderText(LABELS.name), 'Imran');
    fireEvent.changeText(getByPlaceholderText(LABELS.email), 'im@gmail.com');
    fireEvent.changeText(getByPlaceholderText(LABELS.password), '123456');

    act(() => {
        fireEvent.press(getByText(BUTTON.signup));
      });

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith({
        name: 'Imran',
        email: 'im@gmail.com',
        password: '123456',
      });
    });
  });

  test('shows error message when signup fails', async () => {
    mockSignup.mockResolvedValue({
      status: false,
      message: 'Email already exists',
    });

    const { getByPlaceholderText, getByText } = render(<SignUpScreen />);

    fireEvent.changeText(getByPlaceholderText(LABELS.email), 'x@gmail.com');
    fireEvent.changeText(getByPlaceholderText(LABELS.password), '123456');
    fireEvent.changeText(getByPlaceholderText(LABELS.name), 'User');

    act(() => {
        fireEvent.press(getByText(BUTTON.signup));
      });

    await waitFor(() => {
      expect(FlashMessageComponent.show).toHaveBeenCalledWith(
        'error',
        'Email already exists',
      );
    });
  });

  test('navigates back on successful signup', async () => {
    mockSignup.mockResolvedValue({
      status: true,
      message: 'Account created',
    });

    const { getByPlaceholderText, getByText } = render(<SignUpScreen />);

    fireEvent.changeText(getByPlaceholderText(LABELS.name), 'Test');
    fireEvent.changeText(getByPlaceholderText(LABELS.email), 'test@mail.com');
    fireEvent.changeText(getByPlaceholderText(LABELS.password), '123456');

    act(() => {
      fireEvent.press(getByText(BUTTON.signup));
    });

    await waitFor(() => {
      expect(mockGoBack).toHaveBeenCalled();
    });
  });
});
