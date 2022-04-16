import {
  INVALID_EMAIL_MESSAGE,
  INVALID_PASSWORD_MESSAGE,
  AGE_ERROR_MESSAGE,
  TNC_ERROR_MESSAGE,
} from '../validation-messages.json';
import { UniqueEmailValidation } from './unique-email-validation';
import { DOBValidation } from './dob-validation';

const SignUpSchema = {
  username: {
    in: ['body'],
    isEmail: true,
    errorMessage: INVALID_EMAIL_MESSAGE,
    normalizeEmail: {
      gmail_remove_dots: true,
    },
    custom: {
      options: async (username) => {
        try {
          await UniqueEmailValidation.validateEmail(username);
        } catch (e) {
          throw e;
        }
      },
    },
  },
  password: {
    in: ['body'],
    isStrongPassword: true,
    errorMessage: INVALID_PASSWORD_MESSAGE,
  },
  dob: {
    in: ['body'],
    custom: {
      options: (dob) => new Date(dob) <= new Date(DOBValidation.getMinimumDOB()),
    },
    errorMessage: AGE_ERROR_MESSAGE,
  },
  tnc: {
    in: ['body'],
    isBoolean: true,
    custom: {
      options: (tnc) => tnc === true,
    },
    errorMessage: TNC_ERROR_MESSAGE,
  },
};

export { SignUpSchema };
