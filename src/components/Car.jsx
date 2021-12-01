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
  if (year) {
    var config = {
      url: `http://localhost:3001/cars`,
      method: "GET",
      params: {
        year: year,
      },
    };
  } else {
    var config = {
      url: `http://localhost:3001/cars`,
      method: "GET",
    };
  }

  return axios(config);
};

const getCarsbySort = (sort) => {
  const config = {
    url: ` http://localhost:3001/cars?_sort=price&_order=${sort}`,
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
    setLoading(true);
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

  const handleFilter = (year) => {
    setLoading(true);
    return getCarsByYear(year)
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleSort = (sort) => {
    return getCarsbySort(sort)
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>CARS</h1>
      <div>
        <p>Year</p>
        <button
          onClick={() => {
            handleFilter();
          }}
        >
          All
        </button>

        <button
          onClick={() => {
            handleFilter(2016);
          }}
        >
          2016
        </button>
        <button
          onClick={() => {
            handleFilter(2012);
          }}
        >
          2012
        </button>
        <button
          onClick={() => {
            handleFilter(2017);
          }}
        >
          2017
        </button>
        <button
          onClick={() => {
            handleFilter(2011);
          }}
        >
          2011
        </button>
      </div>
      <div>
        <p>Model</p>
        <button>HatchBack</button>
        <button>Sedan</button>
        <button>SUV</button>
      </div>
      <div>
        <p>Sort By Price</p>
        <button
          onClick={() => {
            handleSort("asc");
          }}
        >
          Asc
        </button>
        <button
          onClick={() => {
            handleSort("desc");
          }}
        >
          Desc
        </button>
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
