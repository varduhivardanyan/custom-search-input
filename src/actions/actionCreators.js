import { SET_SELECTED_OPTIONS } from "./actionTypes";

export const setSelectedOptions = (payload) => {
	return {
		type: SET_SELECTED_OPTIONS,
		payload
	}
};