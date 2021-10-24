import {GlobalContext} from "../App";
import {useContext, useEffect} from "react";
import {requestGet} from "../utils/Requests";
import {TOKEN} from "../utils/constants";


function Main({history}) {

    const value = useContext(GlobalContext);

    async function getUser(){
        return await requestGet("login/me");
    }

    useEffect(() => {
              getUser().then(res=>{
                  if(res.data && res.status===200) {
                      value.setLogged(true);
                      value.setUser(res.data.object);
                      history.push("/main")
                  }
              }).catch(()=>{
                  localStorage.removeItem(TOKEN);
                  value.setLogged(false);
                  value.setUser('');
                  history.push("/")
              })
        }, [])


    return <div className={'mt-3'}>
        {/*<div>*/}
        {/*    <h1>Last added residents</h1>*/}
        {/*    <Table>*/}
        {/*        <thead>*/}
        {/*        <tr>*/}
        {/*            <th></th>*/}
        {/*        </tr>*/}
        {/*        </thead>*/}
        {/*    </Table>*/}
        {/*</div>*/}
    </div>
}

export default Main