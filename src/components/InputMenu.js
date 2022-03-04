import React, { useState, useContext } from "react";
import { DataContext } from "../context";

const InputMenu = ({ setreload, setClose }) => {
  const { renderItems } = useContext(DataContext);
  const [store, setStore] = useState("");
  const [menu, setMenu] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { name: store, menuUrl: menu };
    fetch(renderItems.url + "post/newStore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res;
      })
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
    setClose(true);
    setreload(true);
  };

  return (
    <div className="input">
      <a
        onClick={(e) => {
          e.preventDefault();
          setClose(true);
        }}
        href="#menu"
        className="right back"
      >
        <strong>ｘ</strong>
      </a>
      <h2>｜NEW MENU</h2>
      <div className="text">
        <label>新增店名：</label>
        <input
          onChange={(e) => {
            setStore(e.target.value);
          }}
          type="text"
          placeholder="請輸入店名"
        />
        <br />
        <label>新增菜單：</label>
        <input
          onChange={(e) => {
            setMenu(e.target.value);
          }}
          className="url"
          type="text"
          placeholder="請輸入菜單網址"
        />
        <a onClick={handleSubmit} className="submit" href="#menu">
          送出
        </a>
      </div>
      <div className="view">
        預覽圖
        {menu ? (
          <img className="menu-view " src={menu} alt="無法讀取網址" />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default InputMenu;
