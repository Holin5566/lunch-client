import React, { useEffect, useContext, Fragment } from "react";
import OrderCount from "../components/OrderCount";
import { DataContext } from "../context";

// const allFood = (orders) => {
//   let foods = [];
//   orders.forEach((order) => {
//     foods.push(order.food);
//   });
//   const uniFoods = [...new Set(foods)];
//   return uniFoods;
// };

const Aside = () => {
  const { renderItems, newRenderItems } = useContext(DataContext);

  // const renderStore = () => {
  //   const names = [];
  //   const storeList = JSON.parse(localStorage.getItem("storeList"));
  //   if (storeList) {
  //     storeList.forEach((store) => {
  //       let tr = document.getElementById(store._id);
  //       if (tr) {
  //         names.push(
  //           tr.parentElement.parentElement.parentElement.firstChild.innerText
  //         );
  //       }
  //     });
  //   }
  //   return names;
  // };
  // renderStore();
  useEffect(() => {
    //fetch order list
    fetch(renderItems.url + "get/order2List", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("fetch order2List =", data);
        newRenderItems({ type: "orderCount", payload: data.length });
        // uni [order's store list]
        let list = [];
        data.forEach((item) => {
          list.push(item.store.name);
        });
        list = [...new Set(list)];
        newRenderItems({ type: "orderStore", payload: list });

        newRenderItems({ type: "orders", payload: data });

        return data;
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }, []);

  return (
    <aside>
      <ul>
        <h4>當前訂單: {renderItems.orderCount} 份</h4>
        <br />

        {renderItems.orderStore.map((item) => {
          return (
            <Fragment key={item}>
              <h3>{item}</h3>
              <OrderCount currentStore={item} />
            </Fragment>
          );
        })}
      </ul>
    </aside>
  );
};

export default Aside;
