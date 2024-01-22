import axios from 'axios';
import Api from '../config/api';
 
const Auth = {
  async register({ name, email, password }) {
    return await axios.post(Api.REGISTER, { name, email, password });
  },
 
  async login({ email, password }) {
    return await axios.post(Api.LOGIN, { email, password });
  },
};
 
export default Auth;