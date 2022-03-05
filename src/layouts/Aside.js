import React, { useContext, Fragment } from "react";
import OrderCount from "../components/OrderCount";
import { DataContext } from "../context";

const Aside = () => {
  const { renderItemsV2 } = useContext(DataContext);

  const orderTotal = () => {
    let total = 0;
    if (renderItemsV2) {
      renderItemsV2.forEach((store) => {
        if (store.food) {
          store.food.forEach((food) => {
            total = total + food.order.length;
          });
        }
      });
    }
    return total;
  };

  return (
    <aside>
      <ul>
        <h4>當前訂單: {orderTotal()} 份</h4>
        <br />

        {renderItemsV2 ? (
          renderItemsV2.map((store) => {
            return (
              <Fragment key={store.name}>
                <h3>{store.name}</h3>
                <OrderCount currentStore={store} />
              </Fragment>
            );
          })
        ) : (
          <Fragment></Fragment>
        )}
      </ul>
    </aside>
  );
};

export default Aside;
