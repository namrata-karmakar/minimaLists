import { INVALID_EMAIL_MESSAGE } from "../validation-messages.json";

const UsernameValidationSchema = {
  username: {
    in: ["params"],
    isEmail: true,
    normalizeEmail: {
      gmail_remove_dots: true,
    },
    errorMessage: INVALID_EMAIL_MESSAGE,
  },
};

export { UsernameValidationSchema };
