import { useState, useEffect } from "react";
import CarCard from "./CarCard";
import axios from "axios";

const getCars = () => {
  const config = {
    url: "http://localhost:3001/cars",
    method: "GET",
  };
  return axios(config);
};

const Car = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    handleGetCars();
  }, []);

  const handleGetCars = () => {
    return getCars()
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  if (isLoading) {
    return (
      <div>
        <h2>Content Loading Please wait...</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>CARS</h1>
      <div>
        {cars.map((item) => (
          <CarCard data={item}></CarCard>
        ))}
      </div>
    </div>
  );
};

export default Car;
