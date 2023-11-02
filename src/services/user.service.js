import createApiClient from "./api.service";

class UserService {
  constructor(baseUrl = "/api/users") {
    this.api = createApiClient(baseUrl);
  }
  async login(data) {
    return (await this.api.post("/login", data)).data;
  }
  async register(data) {
    return (await this.api.post("/register", data)).data;
  }
  async findByEmail(id) {
    return (await this.api.get(`/findByEmail/${id}`)).data;
  }
  async findById(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async changePassword(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
}

export default new UserService();
