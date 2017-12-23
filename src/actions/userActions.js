

import axios from "axios";
import * as api from "../api";

export function loginUser(username, password) {

    console.log('loginUser:', username, password);
    return (dispatch) => {

        if (!username || !password)
            return;
        //dispatch({type: "LOGIN_START", payload: null});
        //axios.get("http://rest.learncode.academy/api/wstern/users")
        api.login(username, password)
            .then((response) => {
                console.log('loginUser1:');
                console.dir(response);
                if (response.data.is_error)
                {
                    dispatch({ type: "LOGIN_FAIL", payload: response.data.error_message});
                }
                else {
                    dispatch({type: "LOGIN_OK", payload: response.data});
                }
            })
            .catch((err) => {
                console.log('loginUser2:');
                console.dir(err);
                dispatch({ type: "LOGIN_FAIL", payload: "Error occurred during login.  Please contact System Administrator."});
            })
    }
}


export function logout() {
    return {
        type: "LOGOUT",
        payload: null
    }
}

export function dismissAlerts() {

    return {
        type: "DISMISS_ALERTS",
        payload: null
    }
}


export function getTrackingPageOrder(order_number) {
    console.log('getTrackingPageOrder:', order_number);
    return (dispatch) => {

        if (!order_number)
            return;


        api.orderGetByOrderNumber(order_number)
            .then((response) => {
                console.log('orderGetByOrderNumber1:');
                console.dir(response);
                
                const tracking_order = response.data.OrderId ? response.data: null;
                dispatch({type: "GET_TRACKINGPAGE_ORDER", payload: tracking_order});
                
            }).catch((err) => {
                console.log('orderGetByOrderNumber2:');
                console.dir(err);
                dispatch({ type: "ERROR_OCCURRED", payload: err});
            });

       
    }
}


export function newTodo(todo) {
    return {
        type: "CREATE_TODO",
        payload: todo
    }
}