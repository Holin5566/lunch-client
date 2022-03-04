import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../context";

const InputOrder = ({ setreload, close, setClose, foodId, storeId }) => {
  const [studentId, setStudentId] = useState("");
  const [foodName, setFoodName] = useState("");
  const [body, setBody] = useState({});
  const { renderItems } = useContext(DataContext);

  const addNewOrder = (e) => {
    const storeName = document.getElementById(storeId).innerText;
    setBody({
      studentId: studentId,
      food: {
        name: foodName,
        id: foodId,
      },
      store: {
        name: storeName,
        id: storeId,
      },
    });

    e.preventDefault();

    fetch(renderItems.url + "post/newOrder2", {
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
    setClose(false);
    setreload(true);
  };

  useEffect(() => {
    if (foodId) {
      setFoodName(document.getElementById(foodId).firstChild.innerText);
    }
  }, [close]);
  return (
    <fieldset className="input">
      <legend>
        <strong>訂購</strong>
      </legend>
      <p>{foodName}</p>
      <input
        type="number"
        placeholder="請輸入座號"
        onChange={(e) => {
          setStudentId(e.target.value);
        }}
      />
      <a href="#menu" onClick={addNewOrder}>
        下單
      </a>
    </fieldset>
  );
};

export default InputOrder;
