import axios from 'axios';
import authHeader from './auth.headers';
import { API_URL, agent } from '../constants';
class UserService {
  getUsers() {
    return axios.get(API_URL + 'users', { headers: authHeader(), httpsAgent: agent });
  }
  getSolveStatus() {
    return axios.get(API_URL + 'userSolved', { headers: authHeader(), httpsAgent: agent });
  }
  sendAnswer(answer, taskId) {
    return axios.post(API_URL + 'sendAnswer', {
      answer: answer,
      taskId: taskId,
    }, {
      headers: authHeader(),
      httpsAgent: agent
    })
  } 
}
export default new UserService();
