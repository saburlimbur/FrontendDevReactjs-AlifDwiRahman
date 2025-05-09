import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const geoCode = async (address, city) => {
  const response = await axios.get('https://nominatim.openstreetmap.org/search', {
    params: {
      q: `${address}, ${city}`,
      format: 'json',
      limit: 1,
    },
  });

  if (response.data && response.data.length > 0) {
    const { lat, lon } = response.data[0];
    return [parseFloat(lat), parseFloat(lon)];
  }

  throw new Error('Lokasi tidak ditemukan');
};

export const useMapRestaurant = (address, city) => {
  const {
    data: position,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['geocode', address, city],
    queryFn: () => geoCode(address, city),
    enabled: !!address && !!city,
    staleTime: 1000 * 60 * 2,
    retry: false,
  });

  return { position, isLoading, isError };
};
