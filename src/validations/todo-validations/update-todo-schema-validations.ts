import {
  INVALID_ID_MESSAGE,
  INVALID_TODO_MESSAGE,
  INVALID_STATUS_MESSAGE,
} from '../validation-messages.json';
import { IDValidation } from '../id-validation';

const UpdateToDoByIDSchema = {
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
  todo: {
    in: ['body'],
    isLength: {
      options: { min: 3, max: 1000 },
    },
    errorMessage: INVALID_TODO_MESSAGE,
  },
  status: {
    in: ['body'],
    isLength: {
      options: { min: 1, max: 1000 },
    },
    custom: {
      options: (status) =>
        ['Done', 'In Progress', 'Not Started'].indexOf(status) >= 0,
    },
    errorMessage: INVALID_STATUS_MESSAGE,
  },
};

export { UpdateToDoByIDSchema };
