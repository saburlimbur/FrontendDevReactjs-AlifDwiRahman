import axios from 'axios';

const BASE_URL = 'https://restaurant-api.dicoding.dev';

export default class RestaurantService {
  static async getListRestaurant() {
    try {
      const result = await axios.get(`${BASE_URL}/list`);
      return result.data;
    } catch (error) {
      console.log('Error: ', error);
      throw new Error(error);
    }
  }

  static async getDetailRestaurant(id) {
    try {
      const result = await axios.get(`${BASE_URL}/detail/${id}`);
      return result.data;
    } catch (error) {
      console.log('Error: ', error);
      throw new Error(error);
    }
  }

  static getImageUrl(pictureId, size = 'medium') {
    return `${BASE_URL}/images/${size}/${pictureId}`;
  }
}
