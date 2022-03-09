import React, { useState, useContext } from "react";
import { DataContext } from "../context";

const InputFood = ({ setClose, currentStore }) => {
  const { renderItemsV2, newRenderItemsV2 } = useContext(DataContext);
  const [food, setFood] = useState("");
  const [price, setPrice] = useState("");

  // dispatch new food to reducer
  const addNewFood = (e) => {
    if (!food || !price) {
      alert("餐點或價格請勿留白。");
      return;
    }
    if (price > 1000 || price < 1) {
      alert("價格有效範圍為 (1-1000) 。");
      return;
    }
    const newFood = [
      ...currentStore.food,
      { name: food, price: price, order: [] },
    ];
    const targetStore = renderItemsV2.indexOf(currentStore);
    let payload = [...renderItemsV2];
    payload[targetStore].food = newFood;
    newRenderItemsV2({ type: "newFood", payload });
    e.preventDefault();
    setClose(true);
  };

  return (
    <fieldset className="input moveDown">
      <legend>
        <strong>新增品項 | 價錢</strong>
      </legend>
      <p>
        <strong>{currentStore.name}</strong>
      </p>
      <input
        type="text"
        placeholder="請輸入品項"
        onChange={(e) => {
          setFood(e.target.value);
        }}
        required
      />
      <input
        type="number"
        placeholder="請輸入價錢"
        required
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <a href="#" onClick={addNewFood}>
        新增
      </a>
    </fieldset>
  );
};

export default InputFood;
