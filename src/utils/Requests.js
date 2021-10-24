import axios from "axios";
import {BASE_URL, TOKEN} from "./constants";

export const requestPost=(url, data)=>{
    return axios.post(BASE_URL+url, data, {
        headers: {
            'Authorization': localStorage.getItem(TOKEN),
            'Access-Control-Allow-Origin': '*',
        }
    })
}

export const requestPostFile=(url, data) =>{
    return axios.post(BASE_URL+url, data, {
        headers: {
            'Authorization': localStorage.getItem(TOKEN),
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'form/data'
        }
    })
}

export const requestGet=(url)=>{
    return axios.get(BASE_URL + url, {
        headers: {
            'Authorization': localStorage.getItem(TOKEN),
            'Access-Control-Allow-Origin': '*'
        }
    })
}

export const requestPut=(url, data)=> {
    return axios.put(BASE_URL+url, data, {
        headers: {
            'Authorization': localStorage.getItem(TOKEN),
            'Access-Control-Allow-Origin': '*'
        }
    })
}

export const requestDelete=(url)=> {
    return axios.delete(BASE_URL + url, {
        headers: {
            'Authorization': localStorage.getItem(TOKEN),
            'Access-Control-Allow-Origin': '*'
        }
    })
}

export const postRequestWithoutToken=(url, data)=>{
     return axios.post(BASE_URL+url, data);
}