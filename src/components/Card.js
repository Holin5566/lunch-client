import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../context";
import InputFood from "./InputFood";
import InputOrder from "./InputOrder";

const Card = ({ store, index, storeId }) => {
  const [closeFoodForm, setFoodForm] = useState(true);
  const [closeOrderForm, setOrderForm] = useState(true);
  const [foodId, setFoodId] = useState("");
  const { renderItems, newRenderItems } = useContext(DataContext);
  const [reload, setreload] = useState(true);

  //btn function
  const addNewOrder = (e) => {
    e.preventDefault();
    setFoodId(e.target.parentElement.getAttribute("id"));
    setOrderForm(!closeOrderForm);
  };
  const addNewFood = (e) => {
    e.preventDefault();
    setFoodForm(!closeFoodForm);
  };

  useEffect(() => {
    //fetch food list by store id
    fetch(renderItems.url + "get/foodListByStoreid/" + store._id, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        newRenderItems({ type: "foodByStore", payload: data });
        return data;
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }, [reload]);

  return (
    <article className="card">
      <h3 id={storeId}>{store.name}</h3>
      <img className="menu" src={store.menuUrl} alt="連結無法讀取" />
      <div className="list">
        <table>
          <tbody>
            {renderItems.foodByStore[index] ? (
              renderItems.foodByStore[index].map((item) => {
                return (
                  <tr key={item.name} id={item._id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td className="btn" onClick={addNewOrder}>
                      訂購
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            )}
            <tr>
              <td className="btn" onClick={addNewFood}>
                ＋新增品項
              </td>
            </tr>
          </tbody>
        </table>
        <div className={closeOrderForm ? "close" : "open"}>
          {/* <InputOrder setClose={setOrderForm} close={closeOrderForm} /> */}
          <InputOrder
            storeId={storeId}
            foodId={foodId}
            close={closeOrderForm}
            setreload={setreload}
          />
        </div>
        <div className={closeFoodForm ? "close" : "open"}>
          <InputFood
            setClose={setFoodForm}
            close={closeFoodForm}
            currentStore={storeId}
            setreload={setreload}
          />
        </div>
      </div>
    </article>
  );
};

export default Card;
