import React, { useState, useContext } from "react";
import { DataContext } from "../context";

const InputOrder = ({ setClose, currentFood, currentStore }) => {
  const [studentId, setStudentId] = useState("");
  const { renderItemsV2, newRenderItemsV2 } = useContext(DataContext);

  // dispatch new order to reducer
  const addNewOrder = (e) => {
    const newOrder = [...currentFood.order, studentId];
    const targetFood = currentStore.food.indexOf(currentFood);
    const targetStore = renderItemsV2.indexOf(currentStore);
    let payload = [...renderItemsV2];
    payload[targetStore].food[targetFood].order = newOrder;
    newRenderItemsV2({ type: "newOrder", payload });
    e.preventDefault();
    setClose(true);
  };

  return (
    <fieldset className="input moveDown">
      <legend>
        <strong>訂購</strong>
      </legend>
      <p>{currentFood.name}</p>
      <input
        type="number"
        placeholder="請輸入座號"
        onChange={(e) => {
          setStudentId(e.target.value);
        }}
      />
      <a href="#" onClick={addNewOrder}>
        下單
      </a>
    </fieldset>
  );
};

export default InputOrder;
