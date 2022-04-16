import {
  INVALID_EMAIL_MESSAGE,
  INVALID_PASSWORD_MESSAGE,
} from "../validation-messages.json";

const LoginSchema = {
  username: {
    in: ["body"],
    isEmail: true,
    errorMessage: INVALID_EMAIL_MESSAGE,
    normalizeEmail: {
      gmail_remove_dots: true,
    },
  },
  password: {
    in: ["body"],
    isStrongPassword: true,
    errorMessage: INVALID_PASSWORD_MESSAGE,
  },
};

export { LoginSchema };
