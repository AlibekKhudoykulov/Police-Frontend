import {useContext, useState} from 'react'
import {GlobalContext} from "../App";
import {withRouter} from 'react-router-dom'
import {TOKEN} from "../utils/constants";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";


function Header({history}) {
    const logoStyle = {
        width: '70px',
        height: '60px',
        marginLeft: '30px'
    }

    const value =  useContext(GlobalContext);


    function logOut() {
        localStorage.removeItem(TOKEN);
        history.push('/');
    }
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);
    
    return <div>
        <nav style={{borderRadius: '0 0 20px 20px'}} className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/"><img src="resources/logo.png" alt="logo" style={logoStyle}/></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                {
                    !value.logged ?
                        <div className="navbar-nav">
                            <a style={{marginLeft: '1100px'}} className="nav-item nav-link text-end" href="/login">Login</a>
                        </div>
                        :
                        <div className="navbar-nav">
                            <a className="nav-item nav-link text-end" href="/crime">Crimes</a>
                            <a className="nav-item nav-link text-end" href="/station">Police Stations</a>
                            <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                                <DropdownToggle nav caret>
                                    People
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem><a style={{"text-decoration":"none"}} href="/prisoner">Prisoner</a></DropdownItem>
                                    <DropdownItem><a style={{"text-decoration":"none"}} href="/victim">Victim</a></DropdownItem>
                                    <DropdownItem><a style={{"text-decoration":"none"}} href="/witness">Witness</a></DropdownItem>
                                    <DropdownItem><a style={{"text-decoration":"none"}} href="/officer">Officer</a></DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <a className="nav-item nav-link text-end" href="/morgue">Morgue Requst</a>

                            <span style={{marginLeft: '640px'}} className="nav-item nav-link text-end">{value.user.username}</span>
                            <a className="nav-item nav-link text-end" style={{cursor:"pointer"}} onClick={logOut}>Log Out</a>
                        </div>
                }
            </div>
        </nav>
    </div>
}

export default withRouter(Header);