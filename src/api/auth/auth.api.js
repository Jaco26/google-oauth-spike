import axios from 'axios';

export default {
  login: () => {
    return axios.get('/api/auth/login')
      .then(response => response.data)
      .catch(err => {
        console.log(err);
        return err
      });
  },
  logout: () => {
    return axios.get('/api/auth/logout')
      .then(response => response.data)
      .catch(err => {
        console.log(err);
        return err
      });
  }
}