import {
  INVALID_ID_MESSAGE,
} from '../validation-messages.json';
import { IDValidation } from '../id-validation';

const DeleteToDoByIDSchema = {
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

export { DeleteToDoByIDSchema };
