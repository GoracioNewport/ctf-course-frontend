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
}
export default new TaskService();
