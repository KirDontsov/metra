import React, { Fragment } from "react";
import { Helmet } from "react-helmet";

const About = () => (
  <Fragment>
    <Helmet>
      <title>О Нас</title>
      <meta name="description" content="О Нас" />
    </Helmet>
    <div className="container web">
      <div className="heading">
        <h1 className="title">Hello from About!</h1>
      </div>
      <p className="text dark">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse deserunt
        mollitia animi consequuntur perferendis, ipsa impedit? Tempore nostrum,
        voluptate labore laboriosam quam cumque autem, magnam sit, veritatis at
        assumenda a.
      </p>
    </div>
  </Fragment>
);

export default About;
