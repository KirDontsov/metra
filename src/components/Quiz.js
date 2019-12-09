import React, { Component } from "react";
import DadataSuggestions from "react-dadata-suggestions";
import MaskInput from "./MaskInput";
import { connect } from "react-redux";
import "../scss/Dadata.scss";

export class Quiz extends Component {
	handleClick(e, that) {
		let firstAddress = JSON.stringify(that.props.firstAddress.value, 0, 2);
		let secondAddress = JSON.stringify(that.props.secondAddress.value, 0, 2);
		let additionalAddress = JSON.stringify(
			that.props.additionalAddress.value,
			0,
			2
		);

		if (firstAddress !== undefined || null || "") {
			fetch(
				`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=c07c297b-ab06-495a-87e3-2627c9c225d8&geocode=${firstAddress}`
			)
				.then(response => response.json())
				.then(result => that.props.setData1(result));
		}

		if (secondAddress !== undefined || null || "") {
			fetch(
				`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=c07c297b-ab06-495a-87e3-2627c9c225d8&geocode=${secondAddress}`
			)
				.then(response => response.json())
				.then(result => that.props.setData2(result));
		}
		if (additionalAddress !== undefined || null || "") {
			fetch(
				`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=c07c297b-ab06-495a-87e3-2627c9c225d8&geocode=${additionalAddress}`
			)
				.then(response => response.json())
				.then(result => {
					that.props.setData3(result);
				});
		}

		setTimeout(() => {
			let formData = JSON.stringify({
				firstAddress: firstAddress,
				secondAddress: secondAddress,
				additionalAddress: additionalAddress,
				phone: this.props.phone,
				comment: this.props.comment
			});
			if (this.props.didFetched1 === true && this.props.didFetched2 === true) {
				fetch("http://webclient.metrataxi.ru:8000/metrasite", {
					// credentials: "same-origin",
					method: "POST",
					body: formData
					// headers: new Headers({
					// 	"Content-Type": "application/json"
					// })
				}).then(response => {
					response.json().then(data => {
						console.log("Successful" + data);
					});
				});
			} else {
				console.log(formData);
			}
		}, 1000);
	}

	render() {
		const {
			data1,
			data2,
			data3,
			query1,
			query2,
			query3,
			firstAddress,
			secondAddress,
			additionalAddress,
			phone,
			comment
		} = this.props;
		const firstAddressQuery = JSON.stringify(firstAddress.value, 0, 2);
		const secondAddressQuery = JSON.stringify(secondAddress.value, 0, 2);
		const additionalAddressQuery = JSON.stringify(
			additionalAddress.value,
			0,
			2
		);
		return (
			<div className="Quiz">
				<h2 className="dark">Заказать такси</h2>
				<label className="address">Откуда?</label>
				<DadataSuggestions
					label="Откуда?"
					token="d19c6d0b94e64b21d8168f9659f64f7b8c1acd1f"
					onSelect={suggestion => this.props.setFirstAddress(suggestion)}
					deferRequestBy={300}
					placeholder={"Откуда Вас забрать?"}
					query={
						firstAddressQuery === undefined || null || ""
							? query1
							: firstAddressQuery
					}
				/>
				<label className="address">Куда?</label>
				<DadataSuggestions
					token="d19c6d0b94e64b21d8168f9659f64f7b8c1acd1f"
					onSelect={suggestion => this.props.setSecondAddress(suggestion)}
					deferRequestBy={600}
					placeholder={"Куда поедем?"}
					query={
						secondAddressQuery === undefined || null || ""
							? query2
							: secondAddressQuery
					}
				/>
				<label className="address">Дополнительный адрес?</label>
				<DadataSuggestions
					token="d19c6d0b94e64b21d8168f9659f64f7b8c1acd1f"
					onSelect={suggestion => this.props.setAdditionalAddress(suggestion)}
					deferRequestBy={300}
					placeholder={"Дополнительный адрес?"}
					query={
						additionalAddressQuery === undefined || null || ""
							? query3
							: additionalAddressQuery
					}
				/>

				<MaskInput
					name="phone"
					mask="+7 (999) 999-99-99"
					component={MaskInput}
					type="text"
					label="Телефон"
					onChange={e => this.props.setPhone({ phone: e.target.value })}
				/>
				<div className="form-group">
					<label className="comment">Комментарий водителю</label>
					<input
						name="comment"
						type="text"
						onChange={e => this.props.setComment({ comment: e.target.value })}
					/>
				</div>

				<button className="btn" onClick={e => this.handleClick(e, this)}>
					Рассчитать стоимость поездки
				</button>

				<ul className="coords">
					<li>
						{firstAddressQuery}
						{data1 !== ""
							? JSON.stringify(
									data1.response.GeoObjectCollection.featureMember[0].GeoObject
										.Point.pos,
									0,
									2
							  )
							: null}
					</li>
					<li>
						{secondAddressQuery}
						{data2 !== ""
							? JSON.stringify(
									data2.response.GeoObjectCollection.featureMember[0].GeoObject
										.Point.pos,
									0,
									2
							  )
							: null}
					</li>
					<li>
						{additionalAddressQuery}
						{data3 !== ""
							? JSON.stringify(
									data3.response.GeoObjectCollection.featureMember[0].GeoObject
										.Point.pos,
									0,
									2
							  )
							: null}
					</li>
					<li>{JSON.stringify(phone.phone, 0, 2)}</li>
					<li>{JSON.stringify(comment.comment, 0, 2)}</li>
				</ul>
			</div>
		);
	}
}

const mapState = state => ({
	firstAddress: state.Quiz.firstAddress,
	secondAddress: state.Quiz.secondAddress,
	additionalAddress: state.Quiz.additionalAddress,
	phone: state.Quiz.phone,
	comment: state.Quiz.comment,
	query1: state.Quiz.query1,
	query2: state.Quiz.query2,
	query3: state.Quiz.query3,
	data1: state.Quiz.data1,
	data2: state.Quiz.data2,
	data3: state.Quiz.data3,
	didFetched1: state.Quiz.didFetched1,
	didFetched2: state.Quiz.didFetched2,
	didFetched3: state.Quiz.didFetched3
});

const mapDispatch = ({
	Quiz: {
		setFirstAddress,
		setSecondAddress,
		setAdditionalAddress,
		setPhone,
		setComment,
		setData1,
		setData2,
		setData3
	}
}) => ({
	setFirstAddress,
	setSecondAddress,
	setAdditionalAddress,
	setPhone,
	setComment,
	setData1,
	setData2,
	setData3
});

export default connect(mapState, mapDispatch)(Quiz);
