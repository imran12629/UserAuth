import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Text } from "react-native";
import ClearButton from "../../../src/components/ui/ClearButton";

describe("ClearButton Component", () => {
  it("renders the title correctly", () => {
    const { getByText } = render(
      <ClearButton title="Go to Login" onPress={jest.fn()} />
    );

    expect(getByText("Go to Login")).toBeTruthy();
  });

  it("calls onPress when clicked", () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <ClearButton title="Press Me" onPress={onPressMock} />
    );

    fireEvent.press(getByText("Press Me"));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("does NOT call onPress when disabled", () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <ClearButton title="Disabled" onPress={onPressMock} disabled={true} />
    );

    fireEvent.press(getByText("Disabled"));

    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("renders LeftIcon and RightIcon when provided", () => {
    const LeftIcon = () => <Text testID="left-icon">L</Text>;
    const RightIcon = () => <Text testID="right-icon">R</Text>;

    const { getByTestId } = render(
      <ClearButton
        title="Icons"
        onPress={jest.fn()}
        LeftIcon={LeftIcon}
        RightIcon={RightIcon}
      />
    );

    expect(getByTestId("left-icon")).toBeTruthy();
    expect(getByTestId("right-icon")).toBeTruthy();
  });


});
