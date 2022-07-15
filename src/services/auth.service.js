import axios from 'axios';
import { API_URL } from '../constants';
class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'token', 'grant_type=password&username=' + user.username + '&password=' + user.password, { headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(response => {
        if (response.data.access_token && user.remember) {
          localStorage.setItem('user', JSON.stringify(response.data));
          console.log("Saving to local storage...")
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('user');
  }
  register(user) {
    return axios.post(API_URL + 'users', {
      username: user.username,
      password: user.password
    });
  }
}
export default new AuthService();
