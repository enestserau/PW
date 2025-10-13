export interface IRegistrationData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  country: string;
  gender: "male" | "female";
  hobbies: string[];
  language: string;
  skills: string[];
  dateOfBirth: {
    year: string;
    month: string;
    day: string;
  };
  password: string;
  confirmPassword: string;
}

export interface ILoginCredentials {
  username: string;
  password: string;
}
