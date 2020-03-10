import React, { Fragment } from "react";
import { Helmet } from "react-helmet";

import LazyImage from "./../components/LazyImage";

import QuizForDrivers from "../components/QuizForDrivers";
import "./../scss/pages/ForDrivers.scss";

const ForDrivers = () => (
  <Fragment>
    <Helmet>
      <title>Для водителей Метра</title>
      <meta
        name="description"
        content="Для тех, кто хочет стать водителем Такси Метра"
      />
    </Helmet>
    <div className="container web">
      <div className="container forDrivers">
        <QuizForDrivers />
        <LazyImage
          className="heroBanner"
          image={require("./../assets/img/1.jpg")}
          alt="Стань водителем Таккси Метра"
        />
      </div>
    </div>
  </Fragment>
);

export default ForDrivers;
