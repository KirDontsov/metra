import React, { Fragment } from "react";
import LazyImage from "./LazyImage";
import "./../scss/Benefits.scss";

const Benefits = () => {
  return (
    <Fragment>
      <div className="colWrapper">
        <div className="col">
          <LazyImage
            className="image"
            image={require("../assets/img/1.jpg")}
            alt="Такси Метра"
          />
          <div className="cardContent">
            <div className="cardTitle">Безопасность</div>
            <div className="cardText">Водители соблюдают безопасность</div>
          </div>
        </div>
        <div className="col">
          <LazyImage
            className="image"
            image={require("../assets/img/2.jpg")}
            alt="Такси Метра"
          />
          <div className="cardContent">
            <div className="cardTitle">Доброжелательность</div>
            <div className="cardText">Приятные поездки</div>
          </div>
        </div>
        <div className="col">
          <LazyImage
            className="image"
            image={require("../assets/img/3.jpg")}
            alt="Такси Метра"
          />
          <div className="cardContent">
            <div className="cardTitle">Корпоративные клиенты</div>
            <div className="cardText">Стабильность и надежность</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Benefits;
