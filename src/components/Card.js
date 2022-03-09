import React, { useState } from "react";
import InputFood from "./InputFood";
import InputOrder from "./InputOrder";

const Card = ({ store }) => {
  const [closeFoodForm, setFoodForm] = useState(true);
  const [closeOrderForm, setOrderForm] = useState(true);

  const [currentFood, setFood] = useState("");

  //dispatch new order to reducer
  const addNewOrder = (e) => {
    e.preventDefault();
    let newObj = store.food.filter(
      (food) => food.name === e.target.parentElement.getAttribute("id")
    );
    setFood(...newObj);
    setOrderForm(!closeOrderForm);
  };

  //dispatch new food to reducer
  const addNewFood = (e) => {
    e.preventDefault();
    setFoodForm(!closeFoodForm);
  };

  return (
    <article className="card">
      <h3 id={store.name} className="shadow">
        {store.name}
      </h3>
      <div className="content">
        <div className="menu">
          <img src={store.menuUrl} alt="連結無法讀取" />
        </div>
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
          <div className="hidden">
            {closeOrderForm ? (
              ""
            ) : (
              <InputOrder
                currentStore={store}
                currentFood={currentFood}
                setClose={setOrderForm}
              />
            )}
            {closeFoodForm ? (
              ""
            ) : (
              <InputFood
                setClose={setFoodForm}
                close={closeFoodForm}
                currentStore={store}
              />
            )}
          </div>
        </div>
      </div>
      {/* <p className="ps">
        * 如需刪除資料請聯繫作者信箱 :
        <a href="mailto:s1030320chl@gmail.com">s1030320chl @gmail.com</a> *
      </p> */}
      {/* <p className="ps">
        <a href="mailto:s1030320chl@gmail.com">點我聯繫</a>
      </p> */}
    </article>
  );
};

export default Card;
