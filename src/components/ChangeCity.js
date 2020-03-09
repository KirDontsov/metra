import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import "../scss/ChangeCity.scss";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

class ChangeCity extends Component {
	handleChange = event => {
		const cityId = event.target.value;
		this.props.setCity(cityId);
		// eslint-disable-next-line default-case
		switch (cityId) {
			case 10:
				this.props.setLatitude(44.561141);
				this.props.setLongitude(38.076809);
				this.props.setZoom(15);
				this.props.setQuery1("г. Геленджик,");
				this.props.setQuery2("г. Геленджик,");
				break;
			case 20:
				this.props.setLatitude(44.723912);
				this.props.setLongitude(37.768974);
				this.props.setZoom(13);
				this.props.setQuery1("г. Новороссийск,");
				this.props.setQuery2("г. Новороссийск,");
				break;
			case 30:
				this.props.setLatitude(46.711524);
				this.props.setLongitude(38.276451);
				this.props.setZoom(14);
				this.props.setQuery1("г. Ейск,");
				this.props.setQuery2("г. Ейск,");
				break;
		}
	};

	renderCityName = () => {
		switch (this.props.city) {
			case 10:
				return "Геленджик";
				break;
			case 20:
				return "Новороссийск";
				break;
			case 30:
				return "Ейск";
				break;

			default:
				break;
		}
	};

	render() {
		return (
			<FormControl variant="outlined" className="changeCity">
				<InputLabel id="demo-simple-select-outlined-label">{this.renderCityName()}</InputLabel>
				<Select
					labelId="demo-simple-select-outlined-label"
					id="demo-simple-select-outlined"
					value=""
					onChange={this.handleChange}
					labelWidth={20}
				>
					<MenuItem value={10}>Геленджик</MenuItem>
					<MenuItem value={20}>Новороссийск</MenuItem>
					<MenuItem value={30}>Ейск</MenuItem>
				</Select>
			</FormControl>
		);
	}
}

const mapState = state => ({
	city: state.city.city,
	latitude: state.city.latitude,
	longitude: state.city.longitude,
	zoom: state.city.zoom
});

const mapDispatch = ({ city: { setCity, setLatitude, setLongitude, setZoom }, Quiz: { setQuery1, setQuery2, setQuery3 } }) => ({
	setCity,
	setLatitude,
	setLongitude,
	setZoom,
	setQuery1,
	setQuery2,
	setQuery3
});

export default connect(
	mapState,
	mapDispatch
)(ChangeCity);
