import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../App";
import {requestGet, requestPost} from "../utils/Requests";
import {BASE_URL, TOKEN} from "../utils/constants";
import {apiPath} from "../apiPaths/apiPath";
import {Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Pagination,
    Typography
} from "@mui/material";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {toast} from "react-toastify";


function MorgueRequest({history}) {
    const [morgue, setMorgue] = useState([]);
    const [crime, setCrime] = useState([]);
    const [page, setPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [modal, setModal] = useState(false);
    const value = useContext(GlobalContext);

    async function getUser(){
        return await requestGet("login/me");
    }
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }

    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            getUser().then(res => {
                if (res.data && res.status === 200) {
                    value.setLogged(true);
                    value.setUser(res.data.object);
                    getMorguePage(1);
                }
            }).catch(() => {
                localStorage.removeItem(TOKEN);
                value.setLogged(false);
                value.setUser('');
                history.push("/");
            })
        } else {
            value.setLogged(false);
            value.setUser('');
            history.push("/");
        }
    }, [])

    async function getMorguePage(page){
        return await requestGet("request/"+apiPath.morgue+"?page="+(page-1)).then(res=>{
            setMorgue(res.data.content);
            setTotalElements(res.data.totalPages)
            setPage(page)
        })
    }



    function getMore(id) {
        console.log(id);
    }
    function toggle() {
        setModal(!modal)
    }

    const handlePage = (event,value)=>{
        setPage(value);
        getMorguePage(value)
    }
    const hStyle = { color: 'white' };


    return <div className={'mt-3'}>
        <div className={'d-flex justify-content-between align-items-center'}>
            <h3 style={hStyle}>Morgue Requests</h3>
        </div>
        <Table dark striped hover>
            <thead>
            <th>#</th>
            <th>Corpse Card Number</th>
            <th>Officer Card number</th>
            <th>Death Date</th>
            <th>Causes</th>
            <th>End Examination</th>
            <th>Officer Full Name</th>
            </thead>
            <tbody>
            {
                morgue.map((res, index)=>
                    <tr>
                        <th scope={'row'}>{(page-1)*10+index + 1}</th>
                        <td>{res.corpseCardNumber}</td>
                        <td>{res.officerCardNumber}</td>
                        <td>{res.deathDate?formatDate(res.deathDate):"-"}</td>
                        <td>{res.causes}</td>
                        <td>{res.endExamination?<p>YES</p>:<p>NO,In Progress</p>}</td>
                        <td>{res.officer.firstName+" "+res.officer.lastName}</td>
                        <td> <Button size="sm" color="info" onClick={()=>getMore(res.id)}>More</Button></td>
                    </tr>

                )
            }
            </tbody>
        </Table>

        <Pagination count={totalElements} page={page} color="info" onChange={handlePage}/>




    </div>
}
export default MorgueRequest