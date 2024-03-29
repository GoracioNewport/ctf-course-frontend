import axios from 'axios';
import authHeader from './auth.headers';
import { API_URL } from '../constants';
class TaskService {
  getCourses() {
    return axios.get(API_URL + 'courses');
  }
  getTasks(coursePath) {
    return axios.get(API_URL + 'courses/?path=' + coursePath, { headers: authHeader() });
  }
  getLeaderboard() {
    return axios.get(API_URL + "leaderboard");
  }
  getDocs() {
    return axios.get(API_URL + "getDocs");
  }
}
export default new TaskService();
