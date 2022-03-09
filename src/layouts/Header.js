import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="shadow">
      <h1>TODAY'S MENU</h1>
      <nav>
        <Link className="btn" to="/">
          菜單預覽
        </Link>
        <Link className="btn" to="/overView">
          訂單總覽
        </Link>
        <a className="btn" href="https://github.com/Holin5566/lunch-client">
          Github
        </a>
      </nav>
    </header>
  );
};

export default Header;
