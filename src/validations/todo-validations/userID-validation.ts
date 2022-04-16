import { ObjectID } from 'mongodb';
import { CountParams, Database } from '../../database';

class UserIDValidation {
  static async validate(userID: string): Promise<number> {
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const _id = ObjectID.createFromHexString(userID);
      const countParams: CountParams = {
        query: { _id },
        options: {},
        collection: 'userData',
      };
      const db = new Database();
      const count = await db.countDocuments(countParams);
      return count;
    } catch (e) {
      throw e;
    }
  }
}

export { UserIDValidation };
