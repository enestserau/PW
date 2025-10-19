import type { IRegistrationData, ILoginCredentials, IInvalidRegisterCredentials } from "../types/user.types.js";

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
  username: "test@gmail.com",
  password: "SecretPw123!@#",
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

export const INVALID_REGISTER_CRED: IInvalidRegisterCredentials[] = [
  //invalid username cases
  {
    username: "ab",
    password: "SecretPw123!@#",
    errorMessage: "Username should contain at least 3 characters",
  },
  {
    username: "",
    password: "SecretPw123!@#",
    errorMessage: "Username is required",
  },
  {
    username: " prefixuser ",
    password: "ValidPass123",
    errorMessage: "Prefix and postfix spaces are not allowed is username",
  },
  //invalid passwords
  {
    username: "test@gmail.com",
    password: "PASSWORD123",
    errorMessage: "Password should contain at least one character in lower case",
  },
  {
    username: "test@gmail.com",
    password: "Pass12",
    errorMessage: "Password should contain at least 8 characters",
  },
  {
    username: "test@gmail.com",
    password: "          ",
    errorMessage: "Password is required",
  },
];
