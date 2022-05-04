import React, {useState} from "react";

function PlantCard({plant}) {
  const [stock, setStock] = useState(true)

  function handleStockClick() { 
    setStock(!stock)
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {stock ? (
        <button className="primary" onClick={handleStockClick}>In Stock</button>
      ) : (
        <button onClick={handleStockClick}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
