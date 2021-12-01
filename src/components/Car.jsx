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

const getCarsByYear = (year) => {
    const config = {
        url: `http://localhost:3001/cars?year=${year}`,
        method: "GET",
      };
    return axios(config);
}

const Car = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setLoading] = useState(true);
//   const [year,setYears] = useState([]);

  useEffect(() => {
    handleGetCars();
  }, []);

  const handleGetCars = () => {
    return getCars()
      .then((res) => {
        setCars(res.data);
        // setYears(res.data.year);
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

  const handleFilter = (year) => {
        return getCarsByYear(year).then((res)=>{
            setCars(res.data);
            setLoading(false);
        })
  }

  return (
    <div>
      <h1>CARS</h1>
      <div>
        <p>Year</p>
        {cars.map((item) => (
          <button onClick={()=>{handleFilter(item.year)}}>{item.year}</button>
        ))}
      </div>
      <div>
        <p>Model</p>
        <button>HatchBack</button>
        <button>Sedan</button>
        <button>SUV</button>
      </div>
      <div>
          <p>Sort By Price</p>
          <button>Asc</button>
          <button>Desc</button>
      </div>

      <div>
        {cars.map((item) => (
          <CarCard data={item}></CarCard>
        ))}
      </div>
    </div>
  );
};

export default Car;
