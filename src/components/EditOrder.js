import React, { useState, useContext, Fragment, useEffect } from "react";
import { DataContext } from "../context";

const EditOrder = ({ currentFood, currentStore }) => {
  const [open, setOpen] = useState(false);
  const { renderItemsV2, newRenderItemsV2 } = useContext(DataContext);

  // the key for render react components
  let key = 0;

  // open order list
  const handleOpen = (e) => {
    if (currentFood.order.length == 0) {
      alert(currentFood.name + " 尚無訂單");
      setOpen(false);
      return;
    }
    setOpen(!open);
    e.preventDefault();
  };

  // dispatch editOrder to reducer
  const handleCancel = (e) => {
    let target = e.target.parentElement.lastChild.innerText;
    if (
      !window.confirm(
        "確定取消 '" + target + "號' 的 '" + currentFood.name + "' 訂單?"
      )
    ) {
      return;
    }
    let newOrder = [...currentFood.order];
    let sotreIndex = renderItemsV2.indexOf(currentStore);
    let foodIndex = currentStore.food.indexOf(currentFood);
    newOrder.splice(newOrder.indexOf(target), 1);

    newRenderItemsV2({
      type: "editOrder",
      payload: { newOrder, sotreIndex, foodIndex },
    });
    e.preventDefault();
  };

  const handleAdd = (e) => {
    console.log(e.target);
    e.preventDefault();
  };

  // dispatch editFood to reducer
  const deleteFood = (e) => {
    if (!window.confirm("確定刪除 '" + currentFood.name + "' ?")) {
      return;
    }
    let sotreIndex = renderItemsV2.indexOf(currentStore);
    let foodIndex = currentStore.food.indexOf(currentFood);
    let newFood = [...currentStore.food];
    newFood.splice(foodIndex, 1);

    newRenderItemsV2({
      type: "editFood",
      payload: { newFood, sotreIndex, foodIndex },
    });
  };

  return (
    <Fragment>
      <tr>
        <td className="noSelect btn deleteBtn" onClick={deleteFood}>
          {currentFood.name}
        </td>
        <td>{currentFood.price}</td>
        <td className="btn" onClick={handleOpen}>
          <a href="#">{open ? "收起" : "展開"}</a>
        </td>
      </tr>
      {open ? (
        currentFood.order.map((order) => {
          return (
            <tr key={key++} className="order editOrder">
              <td className="btn cancel" onClick={handleCancel}>
                取消訂單
              </td>
              <td className="order">No.</td>
              <td className="order">{order}</td>
            </tr>
          );
        })
      ) : (
        <Fragment></Fragment>
      )}
      {open ? (
        <tr className="order editOrder">
          <td className="tdHidden"></td>
          <td className="tdHidden"></td>
          <td className="btn noSelect" title="尚無功能" onClick={handleAdd}>
            新增
          </td>
        </tr>
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
};

export default EditOrder;
