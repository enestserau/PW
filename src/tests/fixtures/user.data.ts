import type { IRegistrationData, ILoginCredentials } from "./../types/user.types.js";

export const VALID_REGISTRATION_DATA: IRegistrationData = {
  firstName: "John",
  lastName: "Doe",
  address: "123 Main Street, Apt 4B",
  email: "john.doe@example.com",
  phone: "+1234567890",
  country: "USA",
  gender: "male",
  hobbies: ["Travelling", "Sports"],
  language: "English",
  skills: ["JavaScript", "Python"],
  dateOfBirth: {
    year: "1992",
    month: "January",
    day: "15",
  },
  password: "TestPass123",
  confirmPassword: "TestPass123",
};

export const VALID_LOGIN_CREDENTIALS: ILoginCredentials = {
  username: "TestUser123",
  password: "SecurePass123",
};

export const INVALID_USERNAME_CASES = {
  tooShort: "ab",
  onlySpaces: "   ",
};

export const INVALID_PASSWORD_CASES = {
  tooShort: "Pass12",
  noLowerCase: "PASSWORD123",
  onlySpaces: "        ",
};
