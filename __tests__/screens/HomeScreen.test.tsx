import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "../../src/screens/HomeScreen";
import { AuthContext } from "../../src/context/AuthContext";
import { LABELS, BUTTON } from "../../src/utils/constants";

// Mock Data
const mockUser = {
  name: "Imran",
  email: "imran@gmail.com",
};

const mockLogout = jest.fn();

const mockContextValue = {
  user: mockUser,
  logout: mockLogout,
};

const renderWithContext = () =>
  render(
    <AuthContext.Provider value={mockContextValue}>
      <HomeScreen />
    </AuthContext.Provider>
  );

describe("HomeScreen", () => {
  it("renders welcome message", () => {
    const { getByText } = renderWithContext();

    expect(getByText(LABELS.welcome)).toBeTruthy();
  });

  it("shows the user's name", () => {
    const { getByText } = renderWithContext();

    expect(getByText(mockUser.name)).toBeTruthy();
  });

  it("shows the user's email", () => {
    const { getByText } = renderWithContext();

    expect(getByText(mockUser.email)).toBeTruthy();
  });

  it("shows email label", () => {
    const { getByText } = renderWithContext();

    expect(getByText(LABELS.email)).toBeTruthy();
  });

  it("logout button calls logout function", () => {
    const { getByText } = renderWithContext();

    const logoutButton = getByText(BUTTON.logout);
    fireEvent.press(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
