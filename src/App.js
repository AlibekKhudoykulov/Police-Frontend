import {Route, Switch} from 'react-router-dom'
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Main from "./pages/Main";
import {createContext, useState} from "react";
import Dashboard from "./pages/Dashboard";
import Witness from "./pages/Witness";
import PoliceStation from "./pages/PoliceStation";
import Crime from "./pages/Crime";
import Officer from "./pages/Officer";
import Victim from "./pages/Victim";
import Prisoner from "./pages/Prisoner";
import MorgueRequest from "./pages/MorgueRequest";


export const GlobalContext = createContext();

function App() {
    const [logged, setLogged] = useState(false)
    const [user, setUser] = useState('')
    return (<GlobalContext.Provider value={{logged:logged, setLogged:setLogged, user:user, setUser:setUser}}>
        <div className={'container'}>
            <Header/>
            <Switch>
                <Route path={'/login'} component={Login}/>
                <Route path={'/crime'} component={Crime}/>
                <Route path={'/officer'} component={Officer}/>
                <Route path={'/victim'} component={Victim}/>
                <Route path={'/prisoner'} component={Prisoner}/>
                <Route path={'/morgue'} component={MorgueRequest}/>
                <Route path={'/witness'} component={Witness}/>
                <Route path={'/station'} component={PoliceStation}/>
                <Route path={'/dashboard'} component={Dashboard}/>
                <Route path={'/main'} component={Main}/>
                <Route path={'/'} component={Home}/>
            </Switch>
            <ToastContainer/>
        </div>
    </GlobalContext.Provider>);
}

export default App;