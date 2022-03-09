import React, { useState, useContext, Fragment } from "react";
import Card from "../components/Card";
import InputMenu from "../components/InputMenu";
import { DataContext } from "../context";

const Menu = () => {
  const [close, setClose] = useState(true);
  const { renderItemsV2 } = useContext(DataContext);

  return (
    <div id="menu">
      <h2>| MENU</h2>
      <a
        onClick={(e) => {
          setClose(!setClose);
          e.preventDefault();
        }}
        href="#menu"
        className="addMenu-btn"
      >
        新增店家｜菜單
      </a>
      {renderItemsV2 ? (
        renderItemsV2.map((store) => {
          return <Card key={store.name} store={store} />;
        })
      ) : (
        <Fragment></Fragment>
      )}

      <div className={close ? "close" : "filter"}>
        <InputMenu setClose={setClose} />
      </div>
    </div>
  );
};

export default Menu;
