import "./styles/style.css";
import Header from "./layouts/Header";
import Aside from "./layouts/Aside";
import Footer from "./layouts/Footer";
import Menu from "./components/Menu";
// import Total from "./components/Total";
import { useEffect, useReducer } from "react";
import { DataContext } from "./context";

const url = "https://mylunchapp.herokuapp.com/";
// const url = "http://localhost:8080/";

const initRenderList = {
  menu: [],
  foodByStore: [],
  orders: [],
  orderCount: 0,
  orderStore: [],
  // orderByFood: [],
  // orderByFoodCount: 0,
  url: url,
};

function App() {
  const renderReducer = (renderItems, action) => {
    switch (action.type) {
      case "menu": {
        console.log("menu:", action.payload);
        return { ...renderItems, menu: action.payload };
      }
      case "foodByStore": {
        console.log("foodByStore:", action.payload);
        return {
          ...renderItems,
          foodByStore: [...renderItems.foodByStore, action.payload],
        };
      }
      case "orderCount": {
        console.log("orderCount:", action.payload);
        return { ...renderItems, orderCount: action.payload };
      }
      case "orderStore": {
        console.log("orderStore:", action.payload);
        return { ...renderItems, orderStore: action.payload };
      }
      case "orders": {
        console.log("orders:", action.payload);
        return { ...renderItems, orders: action.payload };
      }
      // case "orderByFood": {
      //   console.log("orderByFood:", action.payload);
      //   return { ...renderItems, orderByFood: action.payload };
      // }
      // case "orderByFoodCount": {
      //   console.log("orderByFoodCount:", action.payload);
      //   return { ...renderItems, orderByFoodCount: action.payload };
      // }
      case "loading": {
        console.log("loading:", action.payload);
        return action.payload;
      }
      default: {
        return renderItems;
      }
    }
  };
  const [renderItems, newRenderItems] = useReducer(
    renderReducer,
    initRenderList
  );

  useEffect(() => {
    localStorage.setItem("renderItems", JSON.stringify(renderItems));
  }, [renderItems]);

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem("renderItems"));
    if (local) {
      newRenderItems({ type: "loading", payload: local });
    }
  }, []);

  return (
    <div className="App">
      <DataContext.Provider value={{ renderItems, newRenderItems }}>
        <Header />
        <div className="container">
          <main>
            <Menu url={url} />
          </main>
          <Aside url={url} />
        </div>
        <Footer />
      </DataContext.Provider>
    </div>
  );
}

export default App;
