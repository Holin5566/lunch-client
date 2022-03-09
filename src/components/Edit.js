import React, { useContext, Fragment } from "react";
import { DataContext } from "../context";
import EditOrder from "./EditOrder";

const Edit = ({ currentStore }) => {
  const { renderItemsV2, newRenderItemsV2 } = useContext(DataContext);

  // dispatch edit store to reducer
  const editStore = () => {
    if (!window.confirm("確定刪除 '" + currentStore.name + "' ?")) {
      return;
    }
    let storeIndex = renderItemsV2.indexOf(currentStore);
    let newStore = [...renderItemsV2];
    newStore.splice(storeIndex, 1);

    newRenderItemsV2({
      type: "editStore",
      payload: { newStore },
    });
  };

  // dispatch update to reducer
  const handleUpdate = () => {
    if (!window.confirm("變更即將保存，確定保存變更?")) {
      return;
    }
    newRenderItemsV2({ type: "update", payload: renderItemsV2 });
  };

  if (currentStore) {
    return (
      <div className="detail shadow">
        <div className="menu">
          <p>
            店名|<span>{currentStore.name}</span>
          </p>
          <p>
            URL|
            <span>{currentStore.menuUrl}</span>
          </p>
          <img src={currentStore.menuUrl} alt="圖片無法讀取" />
        </div>
        <div className="list">
          <table>
            <tbody>
              <tr>
                <th>餐點</th>
                <th>價錢</th>
                <th>訂單一覽</th>
              </tr>
              {currentStore.food.map((food) => {
                return (
                  <Fragment key={food.name}>
                    <EditOrder currentFood={food} currentStore={currentStore} />
                  </Fragment>
                );
              })}
            </tbody>
          </table>
          <p className="ps">* 點擊餐點名稱以刪除 *</p>
          <a
            className="noSelect  editStoreBtn deleteBtn"
            href="#"
            onClick={editStore}
          >
            刪除店家
          </a>
          <a href="#" className="uploadBtn" onClick={handleUpdate}>
            保存變更
          </a>
          {/* <a className=" uploadBtn" href="#" onClick={handleUpdate}>
            保存變更
          </a> */}
        </div>
        {/* <p className="ps">* 點擊欲刪除物件以刪除 *</p> */}
      </div>
    );
  } else {
    return <Fragment></Fragment>;
  }
};

export default Edit;
