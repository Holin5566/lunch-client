import React, { useState } from "react";
import InputFood from "./InputFood";
import InputOrder from "./InputOrder";

const Card = ({ store }) => {
  const [closeFoodForm, setFoodForm] = useState(true);
  const [closeOrderForm, setOrderForm] = useState(true);

  const [currentFood, setFood] = useState("");

  //btn function
  const addNewOrder = (e) => {
    e.preventDefault();
    let newObj = store.food.filter(
      (food) => food.name === e.target.parentElement.getAttribute("id")
    );
    setFood(...newObj);
    setOrderForm(!closeOrderForm);
  };
  const addNewFood = (e) => {
    e.preventDefault();
    setFoodForm(!closeFoodForm);
  };

  return (
    <article className="card">
      <h3 id={store.name}>{store.name}</h3>
      <img className="menu" src={store.menuUrl} alt="連結無法讀取" />
      <div className="list">
        <table>
          <tbody>
            {store.food ? (
              store.food.map((food) => (
                <tr key={food.name} id={food.name}>
                  <td>{food.name ? food.name : "點選下方新增餐點"}</td>
                  <td>{food.price}</td>
                  <td className="btn" onClick={addNewOrder}>
                    訂購
                  </td>
                </tr>
              ))
            ) : (
              <tr></tr>
            )}

            <tr>
              <td className="btn" onClick={addNewFood}>
                ＋新增品項
              </td>
            </tr>
          </tbody>
        </table>
        <div className={closeOrderForm ? "close" : "open"}>
          <InputOrder
            currentStore={store}
            currentFood={currentFood}
            setClose={setOrderForm}
          />
        </div>
        <div className={closeFoodForm ? "close" : "open"}>
          <InputFood
            setClose={setFoodForm}
            close={closeFoodForm}
            currentStore={store}
          />
        </div>
      </div>
    </article>
  );
};

export default Card;
