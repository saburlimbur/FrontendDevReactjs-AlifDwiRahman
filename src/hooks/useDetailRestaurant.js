import { useQuery } from '@tanstack/react-query';
import RestaurantService from '../service/api';

const useDetailRestaurant = (id) => {
  const {
    data: restaurantDetail,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['restaurant-detail', id],
    queryFn: () => RestaurantService.getDetailRestaurant(id),
    enabled: !!id,
  });

  return { restaurantDetail, isError, isLoading };
};

export default useDetailRestaurant;
