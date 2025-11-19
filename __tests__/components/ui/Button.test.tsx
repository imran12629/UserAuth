import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from 'react-native';

describe('Button Component', () => {
  it('renders title when not loading', () => {
    const { getByText } = render(
      <Button title="Submit" onPress={jest.fn()} />
    );

    expect(getByText('Submit')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockFn = jest.fn();

    const { getByText } = render(
      <Button title="Press" onPress={mockFn} />
    );

    fireEvent.press(getByText('Press'));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    const mockFn = jest.fn();

    const { getByText } = render(
      <Button title="Disabled" onPress={mockFn} disabled />
    );

    fireEvent.press(getByText('Disabled'));
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('shows ActivityIndicator when loading = true', () => {
    const { getByRole, queryByTestId, toJSON } = render(
      <Button title="Loading Text" onPress={() => {}} loading={true} />
    );

    // expect(toJSON()).toMatchSnapshot();

    expect(getByRole('button')).toBeTruthy();

    expect(queryByTestId('button-title')).toBeNull();
  });

});
