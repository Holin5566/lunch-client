import React, { useState, useContext } from "react";
import { DataContext } from "../context";

const InputMenu = ({ setClose }) => {
  const { renderItemsV2, newRenderItemsV2 } = useContext(DataContext);
  const [store, setStore] = useState("");
  const [menu, setMenu] = useState("");

  // dispatch new store to reducer
  const handleSubmit = (e) => {
    if (!store || !menu) {
      alert(" 餐廳 與 菜單連結 請勿留白。");
      return;
    }
    let menuExist = renderItemsV2.filter((preStore) => preStore.name === store);
    console.log(menuExist);
    if (menuExist[0]) {
      alert("餐廳已存在，請重新確認。");
      return;
    }
    e.preventDefault();
    const newStore = {
      name: store,
      menuUrl: menu,
      food: [],
    };
    console.log("newStore:", newStore);
    let payload = [...renderItemsV2, newStore];

    newRenderItemsV2({ type: "newMenu", payload });
    setClose(true);
  };
  return (
    <div className="input shadow">
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
      <h2>｜NEW</h2>
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
      <div className="view shadow">
        <p>預覽圖</p>
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
