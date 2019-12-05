import React, { Fragment } from "react";
import Quiz from "../components/Quiz";
import MyMap from "../components/Map";

const Home = () => (
  <Fragment>
    <div className="container web">
      <div className="heading">
        <h1 className="title main">Закажи такси</h1>
      </div>
      <Quiz />
      <MyMap />
    </div>
  </Fragment>
);

export default Home;
