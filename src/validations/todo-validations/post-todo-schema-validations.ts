import {
  INVALID_TODO_MESSAGE,
  INVALID_STATUS_MESSAGE,
  INVALID_USERID_MESSAGE,
  INVALID_CREATEDON_MESSAGE,
} from '../validation-messages.json';
import { UserIDValidation } from './userID-validation';

const PostToDoSchema = {
  todo: {
    in: ['body'],
    isLength: {
      options: { min: 3, max: 1000 },
    },
    errorMessage: INVALID_TODO_MESSAGE,
  },
  status: {
    in: ['body'],
    custom: {
      options: (status) => ['Done', 'In Progress', 'Not Started'].indexOf(status) >= 0,
    },
    errorMessage: INVALID_STATUS_MESSAGE,
  },
  userID: {
    in: ['body'],
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
  createdOn: {
    in: ['body'],
    isISO8601: true,
    errorMessage: INVALID_CREATEDON_MESSAGE,
  },
};

export { PostToDoSchema };
