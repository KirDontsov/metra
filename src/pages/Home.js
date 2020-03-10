import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import Benefits from "./../components/Benefits";

import MyMap from "../components/Map";
import Quiz from "../components/Quiz";
import "../scss/pages/Home.scss";

const Home = () => (
  <Fragment>
    <Helmet>
      <title>Такси Метра</title>
      <meta name="description" content="Такси Метра" />
    </Helmet>
    <div className="container web">
      {/* <div className="heading">
        <h1 className="title main">Закажи такси</h1>
      </div> */}
      <div className="container map">
        <Quiz />
        <MyMap />
      </div>
      <Benefits />
    </div>
  </Fragment>
);

export default Home;
