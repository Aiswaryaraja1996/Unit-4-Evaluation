const CarCard = ({ data }) => {
  return (
    <div>
      <div>
        <h2>{data.name}</h2>
        <img src={data.image} alt={data.name}></img>
      </div>
      <div>
          <p>Price : Rs.{data.price}</p>
          <p>Model : {data.type}</p>
          <p>Year  : {data.year}</p>
      </div>
      <div>
          <button>BUY</button>
      </div>
    </div>
  );
};

export default CarCard;
