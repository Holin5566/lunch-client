import React, { Fragment, useContext, useEffect, useState } from "react";
import { DataContext } from "../context";

const OrderCount = ({ currentStore }) => {
  const [renderItem, setRenderItem] = useState([]);
  const { renderItems } = useContext(DataContext);

  useEffect(() => {
    let orderByStore = renderItems.orders.filter(
      (item) => item.store.name === currentStore
    );
    let currentFoods = [];
    // let renderItem = [];
    orderByStore.forEach((item) => {
      currentFoods.push(item.food.name);
    });
    currentFoods = [...new Set(currentFoods)];
    let con = [];
    currentFoods.forEach((food) => {
      let list = orderByStore.filter((order) => order.food.name === food);
      con.push({ name: food, count: list.length });
    });
    setRenderItem(con);
  }, [renderItems.orders]);

  return (
    <Fragment>
      {renderItem.map((item) => {
        return (
          <li key={item.name}>
            {item.name}｜ {item.count} 份
          </li>
        );
      })}
    </Fragment>
  );
};

export default OrderCount;
