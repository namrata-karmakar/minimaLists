import { ObjectID } from 'mongodb';
import { CountParams, Database } from '../database';

class IDValidation {
  static async validate(id: string): Promise<number> {
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const _id = ObjectID.createFromHexString(id);
      const countParams: CountParams = {
        query: { _id },
        options: {},
        collection: 'userToDoData',
      };
      const db = new Database();
      const count = await db.countDocuments(countParams);
      return count;
    } catch (e) {
      throw e;
    }
  }
}

export { IDValidation };
