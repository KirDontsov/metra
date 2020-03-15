import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import "./../scss/pages/ForDrivers.scss";

const ForDrivers = () => (
  <Fragment>
    <Helmet>
      <title>404</title>
      <meta name="description" content="404" />
    </Helmet>
    <div className="container web">
      <h1>Упс... такой страницы не существует</h1>
      <Link to="/">Вернуться на главную</Link>
    </div>
  </Fragment>
);

export default ForDrivers;
