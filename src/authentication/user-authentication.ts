import { Database, ReadParams } from '../database';

class UserAuthentication {
  static async authenticateUser(
    username: string,
    password: string,
  ): Promise<any> {
    try {
      const readOneParams: ReadParams = {
        query: { username, password },
        options: {},
        collection: 'userData',
      };
      const db = new Database();
      const userData = await db.readOne(readOneParams);
      return userData;
    } catch (e) {
      throw e;
    }
  }
}

export { UserAuthentication };