import { createUser, getUser } from "../repositories/User.repository.js";

export class UserService {
  async register(user) {
    try {
      return await createUser(user);
    } catch (error) {
      throw error;
    }
  }

  async getUser(id) {
    try {
      return await getUser(id);
    } catch (error) {
      throw error;
    }
  }
}
