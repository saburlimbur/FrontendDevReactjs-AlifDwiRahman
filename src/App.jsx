import React, { useState } from 'react';
import RestaurantService from './service/api';
import Card from './components/Card';
import Button from './components/Button';
import { Star } from 'lucide-react';
import LoadingElement from './components/LoadingElement';
import useRestaurantlist from './hooks/useListRestaurant';
import { useNavigate } from 'react-router-dom';
import ErrorElement from './components/ErrorElement';

function App() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [itemsToShow, setItemsToShow] = useState(8);

  const { restaurantList, isLoading, isError } = useRestaurantlist();

  if (isLoading) {
    return <LoadingElement />;
  }

  if (isError) {
    return <ErrorElement />;
  }

  const filteredByCategory = category ? restaurantList.restaurants.filter((restaurant) => restaurant.city === category) : restaurantList.restaurants;

  const filteredByRating = ratingFilter ? filteredByCategory.filter((restaurant) => restaurant.rating >= parseFloat(ratingFilter)) : filteredByCategory;

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleRatingFilterChange = (e) => {
    setRatingFilter(e.target.value);
  };

  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + 8);
  };

  const handleClearAll = () => {
    setCategory('');
    setRatingFilter('');
    setItemsToShow(8);
  };

  return (
    <main className="min-h-screen flex flex-col gap-10 container mx-auto py-10">
      <div className="flex flex-col gap-5 px-10">
        <h1 className="text-4xl font-medium">Restaurants</h1>
        <p className="text-gray-400 font-medium text-base max-w-[600px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>

      <header className="py-6 border-y border-y-gray-200">
        <nav className="flex items-center justify-between">
          <div className="px-10 flex gap-8 items-center">
            <p className="text-gray-600 font-normal text-base">Filter By:</p>

            <div className="flex items-center gap-1.5 border-b border-b-gray-200 w-[120px] py-1.5">
              <input type="checkbox" />
              <span className="text-gray-600 font-normal text-base">Open Now</span>
            </div>

            <div className="flex items-center gap-1 border-b border-b-gray-200 py-1.5">
              <select className="rounded-md text-gray-600 font-normal text-base w-[150px] cursor-pointer" value={ratingFilter} onChange={handleRatingFilterChange}>
                <option value="">Rating</option>
                <option value="4">$$$$</option>
                <option value="3">$$$</option>
                <option value="2">$$</option>
                <option value="1">$</option>
              </select>
            </div>

            <div className="flex items-center gap-1 border-b border-b-gray-200 py-1.5">
              <select className="rounded-md text-gray-600 font-normal text-base w-[250px] cursor-pointer" value={category} onChange={handleCategoryChange}>
                <option value="" disabled>
                  Categories
                </option>
                {restaurantList?.restaurants.map((restaurant, index) => (
                  <option key={index} value={restaurant.city} className="cursor-pointer">
                    {restaurant.city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="max-w-md">
            <Button className="py-2 px-8 text-base font-medium border border-gray-200 rounded-md uppercase cursor-pointer hover:bg-gray-50 text-gray-400" onClick={handleClearAll}>
              Clear All
            </Button>
          </div>
        </nav>
      </header>

      <section className="flex flex-col gap-8 px-10">
        <h2 className="text-3xl font-medium">All Restaurants</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
          {filteredByRating.slice(0, itemsToShow).map((restaurant) => {
            const { id, name, pictureId, city, rating } = restaurant;

            return (
              <Card key={id} className="overflow-hidden w-full h-auto flex flex-col justify-between">
                <Card.Image className="h-48 w-full object-cover hover:scale-105 transition-transform duration-200" src={RestaurantService.getImageUrl(pictureId, 'medium')} alt={name} />
                <div className="py-4 flex flex-col gap-3">
                  <Card.Header>
                    <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                  </Card.Header>
                  <Card.Body className="flex flex-col gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={18} className={`${i < Math.floor(rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </Card.Body>
                  <Card.Body className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-sm text-[#00000080]">
                      <p className="text-sm text-[#00000080] uppercase">{city}</p>
                      <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                      <p>{rating}</p>
                    </span>

                    <span className="flex items-center gap-1 text-sm text-[#00000080]">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <p className="text-sm text-[#00000080] uppercase">Open Now</p>
                    </span>
                  </Card.Body>

                  <Card.Footer className="text-sm text-yellow-500 font-medium flex items-center gap-1">
                    <Button className="w-full bg-[#002B56] text-white py-3 cursor-pointer hover:bg-[#002b56f5] transition-all duration-200" onClick={() => navigate(`/detail/${id}`)}>
                      Learn More
                    </Button>
                  </Card.Footer>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="w-lg mx-auto">
          <Button onClick={handleLoadMore} className="w-full py-3 text-base font-medium border border-[#002b56] rounded-md uppercase cursor-pointer hover:bg-gray-50 text-[#002b56]">
            Load More
          </Button>
        </div>
      </section>
    </main>
  );
}

export default App;
