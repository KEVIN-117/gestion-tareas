import { createUser, getUser } from "../repositories/User.repository.js";

export class UserService {
  async register(user) {
    try {
      return await createUser(user);
    } catch (error) {
      throw error;
    }
  }

  async login(data) {
    try {
      return await getUser(data);
    } catch (error) {
      throw error;
    }
  }
}
