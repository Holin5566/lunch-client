import React, { useEffect, useState, useContext } from "react";
import Card from "./Card";
import InputMenu from "./InputMenu";
import { DataContext } from "../context";

const Menu = () => {
  const [close, setClose] = useState(true);
  const { renderItems, newRenderItems } = useContext(DataContext);
  const [reload, setreload] = useState(true);

  useEffect(() => {
    fetch(renderItems.url + "get/storeList", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        newRenderItems({ type: "menu", payload: data });
        return data;
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }, [reload]);

  return (
    <div id="menu">
      <h2>| MENU</h2>
      <hr />
      {renderItems.menu.map((store) => (
        <Card
          key={store.name}
          store={store}
          storeId={store._id}
          index={renderItems.menu.indexOf(store)}
          setreload={setreload}
        />
      ))}
      <a
        onClick={(e) => {
          setClose(!setClose);
          e.preventDefault();
        }}
        href="#menu"
        className="btn"
      >
        新增店家｜菜單
      </a>
      <div className={close ? "close" : "filter"}>
        <InputMenu setClose={setClose} />
      </div>
    </div>
  );
};

export default Menu;
