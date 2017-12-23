

import axios from "axios";

export function setTSList(tsList) {

    return {
        type: "SET_TS_LIST",
        payload: tsList
    };
}


export function newTS(ts) {
    return {
        type: "NEW_TS",
        payload: ts
    }
}


export function removeTS(ts) {
    return {
        type: "REMOVE_TS",
        payload: ts
    }
}

