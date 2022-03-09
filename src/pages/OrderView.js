import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../context";
import Edit from "../components/Edit";

const OrderView = () => {
  const { renderItemsV2, newRenderItemsV2 } = useContext(DataContext);
  const [currentStore, setCurrentStore] = useState([...renderItemsV2][0]);

  const pickStore = (e) => {
    let pickUp = e.target.firstChild.innerText;
    pickUp = renderItemsV2.filter((store) => store.name === pickUp)[0];
    setCurrentStore(pickUp);
    e.preventDefault();
  };

  useEffect(() => {
    setCurrentStore([...renderItemsV2][0]);
  }, [renderItemsV2]);

  return (
    <div id="orderView">
      <h2>| OVERVIEW</h2>
      <ul>
        <h3>選擇店家 |</h3>
        {renderItemsV2.map((store) => {
          let show = "name_li";
          if (store === currentStore) {
            show = "name_li_current shadow";
          }
          return (
            <li className={show} onClick={pickStore} key={store.name}>
              <a href="#">{store.name}</a>
            </li>
          );
        })}
      </ul>
      <Edit currentStore={currentStore} />
    </div>
  );
};

export default OrderView;
