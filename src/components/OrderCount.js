import React, { Fragment } from "react";

const skipZero = (food) => {
  if (food.order.length) {
    return (
      <li key={food.name}>
        {food.name}｜ {food.order.length} 份
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
