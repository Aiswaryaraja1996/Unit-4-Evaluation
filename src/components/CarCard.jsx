import { useState } from "react";
import axios from "axios";

const addUserDetail = (userDetail) => {
  const config = {
    url: "http://localhost:3001/orders",
    method: "POST",
    data: userDetail,
  };
  return axios(config);
};

const CarCard = ({ data }) => {
  const [isBuy, setBuy] = useState(false);
  const [userDetail, setUserDetail] = useState({});

  const handleInput = (e) =>
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(userDetail);
    addUserDetail(userDetail);
    setBuy(false);
    alert("Car Booked Successfully");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "40%",
        border: "1px solid black",
        margin: "2rem auto",
        padding: "1rem",
      }}
    >
      <h2>{data.name}</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <img src={data.image} alt={data.name}></img>
        </div>
        <div>
          <p>Price : Rs.{data.price}</p>
          <p>Model : {data.type}</p>
          <p>Year : {data.year}</p>
        </div>
      </div>

      <div>
        <button onClick={() => setBuy(true)}>BUY</button>
      </div>

      {isBuy && (
        <form onSubmit={handleSubmit}>
          <br />

          <input
            type="text"
            name="name"
            onChange={handleInput}
            placeholder="Name"
          ></input>
          <br />
          <br />

          <input
            type="text"
            name="phone"
            onChange={handleInput}
            placeholder="Phone"
          ></input>
          <br />
          <br />
          <button>Submit</button>
        </form>
      )}
    </div>
  );
};

export default CarCard;
