import { SET_SELECTED_OPTIONS } from "../actions/actionTypes";

const initialState = {
	selectedOptions: []
};

export const dropDownReducer = (state = initialState, action) => {
	if (action.type === SET_SELECTED_OPTIONS) {
		return {
			...state,
			selectedOptions: action.payload
		};
	}

	return state;
};