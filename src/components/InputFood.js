import React, { useState, useContext } from "react";
import { DataContext } from "../context";

const InputFood = ({ setreload, setClose, currentStore }) => {
  const { renderItems } = useContext(DataContext);
  const [food, setFood] = useState("");
  const [price, setPrice] = useState("");

  const addNewFood = (e) => {
    const body = { name: food, store: currentStore, price: price };
    e.preventDefault();
    console.log("nweFood:", body);
    fetch(renderItems.url + "post/newFood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res;
      })
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
    setClose(true);
    setreload(true);
  };

  // useEffect(() => {
  //   fetch(renderItems.url + "get/foodListByStoreid/" + currentStore, {
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, []);
  return (
    <fieldset className="input">
      <legend>
        <strong>新增品項 | 價錢</strong>
      </legend>
      <input
        type="text"
        placeholder="請輸入品項"
        onChange={(e) => {
          setFood(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="請輸入價錢"
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
