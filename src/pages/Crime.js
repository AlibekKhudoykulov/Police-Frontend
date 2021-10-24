import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../App";
import {requestGet, requestPost} from "../utils/Requests";
import {BASE_URL, TOKEN} from "../utils/constants";
import {apiPath} from "../apiPaths/apiPath";
import {Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {Avatar, IconButton, Pagination} from "@mui/material";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {toast} from "react-toastify";
import {findByRole} from "@testing-library/react";
import { Image} from "antd";


function Crime({history}) {
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
                    getCrimePage(1);
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

    async function getCrimePage(page){
        return await requestGet(apiPath.crime+"?page="+(page-1)).then(res=>{
            setCrime(res.data.content);
            setTotalElements(res.data.totalPages)
            setPage(page)
        })
    }

    async function createCrimeReq(witness) {
        return await requestPost(apiPath.crime, witness);
    }

    function createCrime(event,error,values){
        createCrimeReq(values).then(res=>{
            toggle();
            toast.success(res.data.message)
            getCrimePage(1)
        }).catch(error=>{
            if(error.response.status===400) {
                error.response.data.message?toast.error("Error occured!"):
                    error.response.data.errors.map(e=>toast.error(e.message))
            } else {
                toast.error("Error occured!")
            }
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
        getCrimePage(value)
    }
    const hStyle = { color: 'white' };

    return <div className={'mt-3'}>
        <div className={'d-flex justify-content-between align-items-center'}>
            <h3 style={hStyle}>Crimes</h3>
            <button className={'btn btn-success'} onClick={toggle}>Add Crime</button>
        </div>
        <Table dark striped hover>
            <thead>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Time</th>
            <th>Description</th>
            <th>Report Status</th>
            <th>Status</th>
            <th>Type</th>
            </thead>
            <tbody>
            {
                crime.map((res, index)=>
                    <tr>
                        <th scope={'row'}>{(page-1)*10+index + 1}</th>
                        <td>{res.name}</td>
                        <td>{res.address}</td>
                        <td>{formatDate(res.crimeTime)}</td>
                        <td>{res.crimeDescription?res.crimeDescription:"-"}</td>
                        <td>{res.crimeReportStatus?res.crimeReportStatus:"-"}</td>
                        <td>{res.crimeStatus}</td>
                        <td>{res.crimeType}</td>
                        <td> <Button size="sm" color="info" onClick={()=>getMore(res.id)}>More</Button></td>
                    </tr>

                )
            }
            </tbody>
        </Table>
        <Pagination count={totalElements} page={page} color="info" onChange={handlePage}/>


        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create marriage</ModalHeader>

            <AvForm onSubmit={createCrime}>
                <ModalBody>
                    <AvField name="cardNumber" label="Card Number" type="number"  required errorMessage="Please Enter Police Station Name" validate={{
                        pattern: {value: '^[0-9]+$'},
                        minLength: {value: 8},
                        maxlength: {value: 8}
                    }}/>
                    <AvField name="phoneNumber" label="Phone Number" required errorMessage="Please Enter Phone Number"/>
                    <AvField name="remark" label="Info"/>
                </ModalBody>
                <ModalFooter>
                    <FormGroup>
                        <Button color="primary">Create Witness</Button>{' '}
                    </FormGroup>
                    <Button color="secondary" onClick={toggle} type={'button'}>Cancel</Button>
                </ModalFooter>
            </AvForm>
        </Modal>

    </div>
}
export default Crime