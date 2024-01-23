import Config from './config';
 
const Api = {
  REGISTER: `${Config.BASE_URL}/register`,
  LOGIN: `${Config.BASE_URL}/login`,

  GET_ALL_STORY: `${Config.BASE_URL}/stories`,
  GET_BY_ID_STORY: (id) => `${Config.BASE_URL}/stories/${id}`,
  STORE_STORY: `${Config.BASE_URL}/stories`,
};
 
export default Api;