import { useQuery } from '@tanstack/react-query';
import RestaurantService from '../service/api';

const useRestaurantlist = () => {
  const {
    data: restaurantList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['restaurants'],
    queryFn: RestaurantService.getListRestaurant,
  });

  return { restaurantList, isLoading, isError, error };
};

export default useRestaurantlist;
