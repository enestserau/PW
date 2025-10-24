export const registrationNegativeCases = [
  { id: "reg-empty-username", username: "", password: "ValidPass1", reason: "Username обязательное поле — пустое" },
  { id: "reg-username-too-short", username: "ab", password: "ValidPass1", reason: "Username меньше 3 символов" },
  {
    id: "reg-username-too-long",
    username: "a".repeat(41),
    password: "ValidPass1",
    reason: "Username больше 40 символов",
  },
  {
    id: "reg-username-only-spaces",
    username: "   ",
    password: "ValidPass1",
    reason: "Username из одних пробелов запрещен",
  },
  {
    id: "reg-username-leading-space",
    username: " abc",
    password: "ValidPass1",
    reason: "Username с префиксным пробелом запрещен",
  },
  {
    id: "reg-username-trailing-space",
    username: "abc ",
    password: "ValidPass1",
    reason: "Username с постфиксным пробелом запрещен",
  },
  { id: "reg-password-empty", username: "validUser", password: "", reason: "Password обязательное поле — пустое" },
  { id: "reg-password-too-short", username: "validUser", password: "Abc12", reason: "Password меньше 8 символов" },
  {
    id: "reg-password-too-long",
    username: "validUser",
    password: "A" + "a".repeat(20) + "1",
    reason: "Password больше 20 символов",
  },
  {
    id: "reg-password-only-spaces",
    username: "validUser",
    password: "        ",
    reason: "Password из одних пробелов запрещен",
  },
  {
    id: "reg-password-no-uppercase",
    username: "validUser",
    password: "lowercase1",
    reason: "Password без верхнего регистра",
  },
  {
    id: "reg-password-no-lowercase",
    username: "validUser",
    password: "UPPERCASE1",
    reason: "Password без нижнего регистра",
  },
];

export const loginNegativeCases = [
  { id: "login-empty-username", username: "", password: "somepass", reason: "Username обязательное" },
  { id: "login-empty-password", username: "user", password: "", reason: "Password обязательное" },
  { id: "login-empty-both", username: "", password: "", reason: "Оба поля пустые" },
];
