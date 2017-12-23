
import _ from "lodash";
import { applyMiddleware, combineReducers, createStore } from "redux";
import axios from "axios";
//import {createLogger } from "redux-logger";
import thunk from "redux-thunk";


const initialUser = {
    user: null,
    waiting_for_server: false,
    alerts: []
}
const userReducer = (state=initialUser, action) => {

    switch (action.type) 
    {

        case "LOGIN_START":

            var new_state = _.assign({}, state, { waiting_for_server: true, login: null })
            return new_state;
        break;

        case "LOGIN_OK":
            var new_state = _.assign({}, state, { waiting_for_server: false, login: action.payload.user});
            return new_state;
        break;

        case "LOGOUT":
            var new_state = _.assign({}, state, { login: null });
            return new_state;

        case "LOGIN_FAIL":

            console.log('store.LOGIN_FAIL:');
            console.dir(action);
            let message;
            if (!action.payload) {
                message = 'Login failed.';
            }
            else if (typeof action.payload === 'string' )
            {
                message = action.payload;
            }
            else {
                message = JSON.stringify(action.payload);
            }

            var new_state = _.assign({}, state, { waiting_for_server: false, login: null, alerts: [ { type: 'danger', msg: message }]});
            return new_state;
        break;

        case "GET_TRACKINGPAGE_ORDER":

            var new_state = _.assign({}, state, { tracking_page_order: action.payload });
            return new_state;
        break;


        case "DISMISS_ALERTS":

            var new_state = _.assign({}, state, {alerts: []});
            return new_state;
        
    }

    var new_state = _.assign({}, state, { done: false});
    return new_state;
}


const tsReducer = (state=[], action) => {

    switch (action.type) 
    {

        case "SET_TS_LIST":

            var todos = action.payload;
            var new_state = todos.slice();
            return new_state;

        case "NEW_TS":

            var todos = state.slice();
            
            todos.push(action.payload);
            //var new_state = _.assign({}, state, todos);
            return todos;
        break;
    
        case "REMOVE_TS":

            var todos = state.slice();
            _.remove(todos, function(currentTS) { return (currentTS.task == action.payload.task) });

            return todos;
    }

    var new_state = state.slice();
    return new_state;
}


const logger = (store) => (next) => (action) => {
   console.log("action fired", action);
   next(action);
}
const middleware = applyMiddleware(thunk);


const reducers = combineReducers({
    user: userReducer,
    ts: tsReducer
})


export default createStore(reducers, { user: null, ts: []}, middleware);
