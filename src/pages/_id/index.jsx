import React from 'react';
import { useParams } from 'react-router-dom';
import useDetailRestaurant from '../../hooks/useDetailRestaurant';
import LoadingElement from '../../components/LoadingElement';
import ErrorElement from '../../components/ErrorElement';
import RestaurantService from '../../service/api';
import { MapPin, Star, Tag } from 'lucide-react';
import Card from '../../components/Card';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import createClusterCustomIcon, { markers } from '../../components/CustomCluster';
import MarkerClusterGroup from 'react-leaflet-cluster';

function DetailPage() {
  const { id } = useParams();
  const { restaurantDetail, isLoading, isError } = useDetailRestaurant(id);

  if (isLoading) return <LoadingElement />;
  if (isError || !restaurantDetail?.restaurant) return <ErrorElement />;

  const restaurant = restaurantDetail.restaurant;
  let staticCoordinate = [-6.466009, 106.848309];

  return (
    <main className="min-h-screen max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-10 flex flex-col gap-10">
      <Card className="flex flex-col lg:flex-row md:flex-col gap-6 md:gap-8 overflow-hidden">
        <Card.Image src={RestaurantService.getImageUrl(restaurant.pictureId, 'large')} alt={restaurant.name} className="w-full h-full object-cover" />

        <Card.Header className="w-full lg:w-1/2 md:w-full flex flex-col justify-between p-4 sm:p-6 md:p-3 gap-6">
          <Card.Body className="flex flex-col gap-4">
            <span className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin size={18} />
              {restaurant?.address}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{restaurant.name}</h1>

            <div className="flex justify-between w-full sm:flex-row sm:justify-between text-sm text-gray-600 gap-2">
              <div className="flex items-center gap-2">
                <span className="uppercase font-semibold tracking-wide">{restaurant.city}</span>
                <span className="text-yellow-600 font-medium">{restaurant.rating.toFixed(1)} / 5</span>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs font-medium uppercase">Open Now</span>
              </div>
            </div>

            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className={i < Math.floor(restaurant.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'} />
              ))}
            </div>

            <p className="text-gray-700 text-xs leading-relaxed text-justify">{restaurant.description}</p>
          </Card.Body>

          <Card.Footer className="flex flex-wrap gap-2 pt-2">
            {restaurant.categories.map((cat, index) => (
              <Card.Badge key={index} className="inline-flex items-center gap-1.5 bg-[#002b56] text-white text-xs px-3 py-1.5 rounded-full">
                <Tag size={14} />
                {cat.name}
              </Card.Badge>
            ))}
          </Card.Footer>
        </Card.Header>
      </Card>

      <Card className="p-4 sm:p-6 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Customer Reviews</h2>

        <div className="space-y-4">
          {restaurant.customerReviews.map((review, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="w-12 h-12 rounded-full bg-[#002b56] text-white flex items-center justify-center text-lg font-semibold">{review.name.charAt(0)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-800">{review.name}</span>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700 text-sm">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">Location</h2>

        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden">
          <MapContainer center={staticCoordinate} zoom={13} className="h-full w-full">
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
              {markers.map((marker) => (
                <Marker key={marker.name} position={marker.geoPosition}>
                  <Popup>{marker.popUp}</Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      </Card>
    </main>
  );
}

export default DetailPage;
