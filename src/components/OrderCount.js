import React, { Fragment } from "react";

// return the list for each food's order, and skip the empty order
const skipZero = (food) => {
  if (food.order.length) {
    return (
      <li key={food.name} className="orderCount">
        <p>{food.name}｜</p> <p>{food.order.length} 份</p>
      </li>
    );
  }
};

const OrderCount = ({ currentStore }) => {
  return (
    <Fragment>
      {currentStore.food ? (
        currentStore.food.map((food) => {
          return skipZero(food);
        })
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
};

export default OrderCount;
