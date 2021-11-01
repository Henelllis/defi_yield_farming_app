import React, { useState } from "react";
import Navbar from "./Navbar";
import "./App.css";

const App = () => {
  const [account, setAcount] = useState("0x0");

  return (
    <div>
      <Navbar account={account} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "600px" }}
          >
            <div className="content mr-auto ml-auto">
              <a
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
              <h1>Hello, World!</h1>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
