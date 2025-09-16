import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://6811c5a73ac96f7119a58412.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        console.log("Ошибка при получении пиццы");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return "Загрузка...";
  }

  return (
    <div className="container">
      <img className="pizza-block__image" src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
