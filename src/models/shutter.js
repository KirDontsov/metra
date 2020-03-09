const shutter = {
	state: {
		addClass: false
	},
	reducers: {
		changeClass(state, payload) {
			return {
				addClass: payload
			};
		}
	},
	effects: dispatch => ({
		slide(payload, state) {
			dispatch.shutter.changeClass(true);
			setTimeout(() => {
				dispatch.shutter.changeClass(false);
			}, 1000);
		}
	})
};

export default shutter;
