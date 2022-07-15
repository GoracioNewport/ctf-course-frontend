import axios from 'axios';
import authHeader from './auth.headers';
import { API_URL } from '../constants';
class UserService {
  getUsers() {
    return axios.get(API_URL + 'users', { headers: authHeader() });
  }
}
export default new UserService();
