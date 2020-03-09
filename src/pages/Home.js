import React, { Fragment } from "react";

import MyMap from "../components/Map";
import Quiz from "../components/Quiz";

const Home = () => (
	<Fragment>
		<div className="container web">
			{/* <div className="heading">
        <h1 className="title main">Закажи такси</h1>
      </div> */}
			<Quiz />
			<MyMap />
		</div>
	</Fragment>
);

export default Home;
