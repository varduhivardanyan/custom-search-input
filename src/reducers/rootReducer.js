import { combineReducers } from 'redux';
import { dropDownReducer } from './dropDownReducer';

export default combineReducers({
	dropDown: dropDownReducer
});