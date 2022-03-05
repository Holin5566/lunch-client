import "./styles/style.css";
import Header from "./layouts/Header";
import Aside from "./layouts/Aside";
import Footer from "./layouts/Footer";
import Menu from "./components/Menu";
// import Total from "./components/Total";
import { useEffect, useReducer } from "react";
import { DataContext } from "./context";

// const url = "https://mylunchapp.heroknpuapp.com/";
const url = "http://localhost:8080/";

const initRenderV2 = [];
//test render
// const initRenderV2 = [
//   {
//     name: "大水缸",
//     menuUrl:
//       "https://scontent.ftpe8-4.fna.fbcdn.net/v/t1.6435-9/30629780_1800633623573670_3493114253504675840_n.jpg?stp=dst-jpg_p180x540&_nc_cat=110&ccb=1-5&_nc_sid=e3f864&_nc_ohc=OVXVfMEBBJwAX_v2rIJ&_nc_ht=scontent.ftpe8-4.fna&oh=00_AT_scFMLf11_CCIwyfWRzvhzEq4nfcKtei0MLlcv-6m8Rw&oe=624A4586",
//     food: [
//       { name: "香酥大雞腿", price: 85, order: [3, 5, 8, 7] },
//       { name: "香酥大腿", price: 85, order: [4, 6, 1, 15] },
//       { name: "香酥雞腿", price: 85, order: [11, 9, 25, 30] },
//       { name: "香酥大雞", price: 85, order: [13, 15, 18, 17] },
//     ],
//   },
// ];

function App() {
  const postToDB = (payload) => {
    fetch(url + "post/storeData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res;
      })
      .then((e) => {
        console.log("update data to mongoDB:sucess", payload);
      })
      .catch((e) => {
        console.log("update data to mongoDB:fail");
        console.log(e);
      });
  };

  //reducer v2
  const renderReducerV2 = (renderItemsV2, action) => {
    switch (action.type) {
      case "newMenu": {
        console.log("newMenu:", action.payload);
        postToDB(action.payload);
        return action.payload;
      }
      case "newFood": {
        console.log("newFood:", action.payload);
        postToDB(action.payload);
        return action.payload;
      }
      case "newOrder": {
        console.log("newOrder:", action.payload);
        postToDB(action.payload);
        return action.payload;
      }
      case "mongoDB": {
        console.log("mongoDB:", action.payload);
        postToDB(action.payload);
        return action.payload;
      }
      default: {
        return renderItemsV2;
      }
    }
  };
  const [renderItemsV2, newRenderItemsV2] = useReducer(
    renderReducerV2,
    initRenderV2
  );

  useEffect(() => {
    fetch(url + "get/storeData", {
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data[0].list);
        console.log("loading from mongoDB:succes");
        newRenderItemsV2({ type: "mongoDB", payload: data[0].list });
        return data;
      })
      .catch((e) => {
        console.log("loading from mongoDB:error");
        console.log(e);
        return e;
      });
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("renderItems", JSON.stringify(renderItemsV2));
  // }, [renderItemsV2]);

  return (
    <div className="App">
      <DataContext.Provider value={{ renderItemsV2, newRenderItemsV2, url }}>
        <Header />
        <div className="container">
          <main>
            <Menu />
          </main>
          <Aside />
        </div>
        <Footer />
      </DataContext.Provider>
    </div>
  );
}

export default App;
