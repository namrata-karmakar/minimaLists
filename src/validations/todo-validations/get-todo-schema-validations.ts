import {
  INVALID_USERID_MESSAGE,
  INVALID_ID_MESSAGE,
} from '../validation-messages.json';
import { UserIDValidation } from './userID-validation';
import { IDValidation } from '../id-validation';

const GetToDoByUserIDSchema = {
  userID: {
    in: ['params'],
    isLength: {
      options: { min: 1, max: 1000 },
    },
    isHexadecimal: true,
    isMongoId: true,
    custom: {
      options: async (userID) => {
        try {
          const count = await UserIDValidation.validate(userID);
          if (count === 0) throw new Error(INVALID_USERID_MESSAGE);
        } catch (e) {
          throw e;
        }
      },
    },
    errorMessage: INVALID_USERID_MESSAGE,
  },
};

const GetToDoByIDSchema = {
  id: {
    in: ['params'],
    isLength: {
      options: { min: 1, max: 1000 },
    },
    isHexadecimal: true,
    isMongoId: true,
    custom: {
      options: async (id) => {
        try {
          const count = await IDValidation.validate(id);
          if (count === 0) throw new Error(INVALID_ID_MESSAGE);
        } catch (e) {
          throw e;
        }
      },
    },
    errorMessage: INVALID_ID_MESSAGE,
  },
};

export { GetToDoByUserIDSchema, GetToDoByIDSchema };
