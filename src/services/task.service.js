import axios from 'axios';
import authHeader from './auth.headers';
import { API_URL, agent } from '../constants';
class TaskService {
  getCourses() {
    return axios.get(API_URL + 'courses', { httpsAgent: agent });
  }
  getTasks(coursePath) {
    return axios.get(API_URL + 'courses/?path=' + coursePath, { headers: authHeader(), httpsAgent: agent });
  }
  getLeaderboard() {
    return axios.get(API_URL + "leaderboard", { httpsAgent: agent });
  }
}
export default new TaskService();
