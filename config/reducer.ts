import { combineReducers } from 'redux';
import UserReducer from '../modules/user/user'


export default combineReducers({
    user: UserReducer
});
