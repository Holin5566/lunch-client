import React, { useState, useContext, Fragment } from "react";
import Card from "./Card";
import InputMenu from "./InputMenu";
import { DataContext } from "../context";

const Menu = () => {
  const [close, setClose] = useState(true);
  const { renderItemsV2 } = useContext(DataContext);

  return (
    <div id="menu">
      <h2>| MENU</h2>
      <hr />
      {renderItemsV2 ? (
        renderItemsV2.map((store) => {
          return <Card key={store.name} store={store} />;
        })
      ) : (
        <Fragment></Fragment>
      )}
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
