import React, {useContext, useEffect} from 'react';
import {GlobalContext} from "../App";
import {requestGet} from "../utils/Requests";
import {TOKEN} from "../utils/constants";
import {List, ListItem, ListItemText, ListSubheader} from "@mui/material";
import {Route, Switch} from "react-router-dom";
import Login from "./Login";
import Main from "./Main";
import Home from "./Home";

const Dashboard = ({history}) => {

    const value = useContext(GlobalContext);

    async function getUser(){
        return await requestGet("login/me");
    }

    useEffect(() => {
        getUser().then(res=>{
            if(res.data && res.status===200) {
                value.setLogged(true);
                value.setUser(res.data.object);
                history.push("/dashboard")
            }
        }).catch(()=>{
            localStorage.removeItem(TOKEN);
            value.setLogged(false);
            value.setUser('');
            history.push("/")
        })
    }, [])

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};

export default Dashboard;