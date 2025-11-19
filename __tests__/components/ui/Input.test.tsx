import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Input, { InputRef } from '../../../src/components/ui/Input';

describe('Input Component', () => {
  test('renders label when provided', () => {
    const { getByText } = render(<Input label="Username" />);
    expect(getByText('Username')).toBeTruthy();
  });

  test('renders error message', () => {
    const { getByText } = render(<Input errorMessage="Required field" />);
    expect(getByText('Required field')).toBeTruthy();
  });

  test('calls onChangeText when text changes', () => {
    const mockFn = jest.fn();
    const { getByTestId } = render(
      <Input onChangeText={mockFn} value="" testID="input-field" />,
    );

    fireEvent.changeText(getByTestId('input-field'), 'Hello');
    expect(mockFn).toHaveBeenCalledWith('Hello');
  });

  test('shows eye icon when secureTextEntry=true', () => {
    const { getByTestId } = render(
      <Input secureTextEntry testID="input-field" />,
    );
    expect(getByTestId('password-toggle')).toBeTruthy();
  });

  test('toggles password visibility on eye icon press', () => {
    const { getByTestId } = render(<Input secureTextEntry />);

    const eyeButton = getByTestId('password-toggle');
    const textInput = getByTestId('text-input');

    // First press → password should be visible
    fireEvent.press(eyeButton);
    expect(textInput.props.secureTextEntry).toBe(false);

    // Second press → hide again
    fireEvent.press(eyeButton);
    expect(textInput.props.secureTextEntry).toBe(true);
  });

  test('getValue returns the passed value', () => {
    const ref = React.createRef<InputRef>();

    render(<Input ref={ref} value="Hello" />);
    expect(ref.current?.getValue()).toBe('Hello');
  });
});
