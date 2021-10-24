import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../App";
import {requestDelete, requestGet, requestPost} from "../utils/Requests";
import {TOKEN} from "../utils/constants";
import {apiPath} from "../apiPaths/apiPath";
import {Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {Pagination} from "@mui/material";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {toast} from "react-toastify";
import {findByRole} from "@testing-library/react";


function PoliceStation({history}) {
    const [policeStations, setPoliceStations] = useState([]);
    const [page, setPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [modal, setModal] = useState(false);
    const [modalMore, setModalMore] = useState(false);
    const value = useContext(GlobalContext);

    async function getUser(){
        return await requestGet("login/me");
    }

    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            getUser().then(res => {
                if (res.data && res.status === 200) {
                    value.setLogged(true);
                    value.setUser(res.data.object);
                    getPoliceStationPage(1);
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

    async function getPoliceStationPage(page){
        return await requestGet(apiPath.station+"?page="+(page-1)).then(res=>{
            setPoliceStations(res.data.content);
            setTotalElements(res.data.totalPages)
            setPage(page)
        })
    }
    async function createPoliceStationReq(station) {
        return await requestPost(apiPath.station, station);
    }

     function createPoliceStation(event,error,values){
        let station={
            ...values
        }
         createPoliceStationReq(station).then(res=>{
            toggle();
            toast.success(res.data.message)
            getPoliceStationPage(1)
        }).catch(error=>{
             if(error.response.status===400) {
                 error.response.data.message?toast.error("Error occured!"):
                     error.response.data.errors.map(e=>toast.error(e.message))
             } else {
                 toast.error("Error occured!")
             }
         })
     }

     function deleteStation(id){
        requestDelete(apiPath.station + "/" + id).then( res =>{
            toast.success(res.data.message)
            getPoliceStationPage(1)
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

    function toggleMore() {
        setModalMore(!modalMore)
    }


    const handlePage = (event,value)=>{
        setPage(value);
        getPoliceStationPage(value)
    }
    const hStyle = { color: 'white' };


    return <div className={'mt-3'}>
        <div className={'d-flex justify-content-between align-items-center'}>
            <h3 style={hStyle}>Police Stations</h3>
            <button className={'btn btn-success'} onClick={toggle}>Add Police Station</button>
        </div>
        <Table dark striped>
        <thead>
        <th>#</th>
        <th>Name</th>
        <th>Address</th>
        <th>Phone Number</th>
        <th>Info</th>
        </thead>
        <tbody>
        {
            policeStations.map((res, index)=>
                <tr>
                    <th scope={'row'}>{(page-1)*10+index + 1}</th>
                    <td>{res.name}</td>
                    <td>{res.address}</td>
                    <td>{res.phoneNumber?res.phoneNumber:"-"}</td>
                    <td>{res.remark?res.remark:"-"}</td>
                    <td> <Button size="sm" color="info" onClick={()=>getMore(res.id)}>More</Button></td>
                    <td> <Button size="sm" color="primary" onClick={toggleMore}>Edit</Button></td>
                    <td> <Button size="sm" color="danger" onClick={()=>deleteStation(res.id)}>Delete</Button></td>
                </tr>

            )
        }
        </tbody>
    </Table>
        <Pagination style={hStyle} count={totalElements} page={page}  color="info" onChange={handlePage}/>


        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create marriage</ModalHeader>

            <AvForm onSubmit={createPoliceStation}>
                <ModalBody>
                    <AvField name="name" label="Name" required errorMessage="Please Enter Police Station Name"/>
                    <AvField name="address" label="Address" required errorMessage="Please Enter Police Station Address"/>
                    <AvField name="phoneNumber" label="Phone Number" required errorMessage="Please Enter Police Station Phone Number"/>
                    <AvField name="remark" label="Info"/>
                </ModalBody>
                <ModalFooter>
                    <FormGroup>
                        <Button color="primary">Create Police Station</Button>{' '}
                    </FormGroup>
                    <Button color="secondary" onClick={toggle} type={'button'}>Cancel</Button>
                </ModalFooter>
            </AvForm>
            </Modal>


        <Modal isOpen={modalMore} toggle={toggleMore}>
            <ModalHeader toggle={toggleMore}>Create marriage</ModalHeader>

            <AvForm onSubmit={createPoliceStation}>
                <ModalBody>
                    <AvField name="name" label="Name" required errorMessage="Please Enter Police Station Name"/>
                    <AvField name="address" label="Address" required errorMessage="Please Enter Police Station Address"/>
                </ModalBody>
                <ModalFooter>
                    <FormGroup>
                        <Button color="primary">Create Station</Button>{' '}
                    </FormGroup>
                    <Button color="secondary" onClick={toggleMore} type={'button'}>Cancel</Button>
                </ModalFooter>
            </AvForm>
        </Modal>

    </div>
}
export default PoliceStation