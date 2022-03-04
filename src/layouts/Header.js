import React from "react";

const Header = () => {
  return (
    <header>
      <h1>TODAY'S MENU</h1>
      <nav>
        <br />
        <br />
        <a href="#menu">菜單預覽</a>
        {/* <a href="#order">預定餐點</a> */}
        <a href="#total">金額統計</a>
      </nav>
    </header>
  );
};

export default Header;
