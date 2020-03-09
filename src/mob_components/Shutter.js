import React, { Component } from "react";
import { connect } from "react-redux";
import "../scss/Shutter.scss";

class Shutter extends Component {
	// handleClick() {
	//   this.props.changeClass(!this.state.addClass);
	//   console.log("click");
	// }
	render() {
		let shutterClass = ["shutter"];

		if (this.props.addClass) {
			shutterClass.push("active");
		}
		return (
			<div className={shutterClass.join(" ")}>
				<div className="logo" />
			</div>
		);
	}
}

const mapState = state => ({
	addClass: state.shutter.addClass
});

const mapDispatch = ({ shutter: { changeClass } }) => ({
	changeClass
});

export default connect(
	mapState,
	mapDispatch
)(Shutter);
