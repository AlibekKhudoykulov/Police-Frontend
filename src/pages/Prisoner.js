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
    Pagination, Switch,
    Typography
} from "@mui/material";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {toast} from "react-toastify";


function Prisoner({history}) {
    const [prisoner, setPrisoner] = useState([]);
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
                    getPrisonerPage(1);
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

    async function getPrisonerPage(page){
        return await requestGet(apiPath.prisoner+"?page="+(page-1)).then(res=>{
            setPrisoner(res.data.content);
            setTotalElements(res.data.totalPages)
            setPage(page)
        })
    }

    async function getCrimePage(page){
        return await requestGet(apiPath.crime+"?page="+(page-1)).then(res=>{
            setCrime(res.data.content);
            console.log(res.data.content)
        })
    }
    async function createPrisonerReq(prisoner) {
        return await requestPost(apiPath.prisoner, prisoner);
    }

    function createPrisoner(event,error,values){
        createPrisonerReq(values).then(res=>{
            toggle();
            toast.success(res.data.message)
            getPrisonerPage(1)
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
        getPrisonerPage(value)
    }
    const hStyle = { color: 'white' };


    return <div className={'mt-3'}>
        <div className={'d-flex justify-content-between align-items-center'}>
            <h3 style={hStyle}>Prisoners</h3>
            <button className={'btn btn-success'} onClick={toggle}>Add Prisoner</button>
        </div>
        <Table dark striped hover>
            <thead>
            <th>#</th>
            <th>Avatar</th>
            <th>Card number</th>
            <th>Full name</th>
            <th>Birth date</th>
            <th>Prison Duration</th>
            <th>Starting Date</th>
            <th>Ending Date</th>
            <th>In prison</th>
            <th>Info</th>
            </thead>
            <tbody>
            {
                prisoner.map((res, index)=>
                    <tr>
                        <th scope={'row'}>{(page-1)*10+index + 1}</th>
                        <td>
                            <Avatar
                                src={"http://citymanagementfull-env.eba-tixcjyas.us-east-2.elasticbeanstalk.com/api/v1/"+apiPath.photo+res.photoId}
                            />
                        </td>
                        <td>{res.cardNumber}</td>
                        <td>{res.firstName+" "+res.surname}</td>
                        <td>{formatDate(res.birthDate)}</td>
                        <td>{res.prisonDuration}</td>
                        <td>{formatDate(res.startingDate)}</td>
                        <td>{formatDate(res.endingDate)}</td>
                        <td>{res.inPrison?
                            <p>YES</p>
                            :
                            <p>NO</p>

                        }</td>
                        <td>{res.remark?res.remark:"-"}</td>
                        <td> <Button size="sm" color="info" onClick={()=>getMore(res.id)}>More</Button></td>
                    </tr>

                )
            }
            </tbody>
        </Table>

        <Pagination count={totalElements} page={page} color="info" onChange={handlePage}/>


        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Victim</ModalHeader>

            <AvForm onSubmit={createPrisonerReq}>
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
                        <Button color="primary">Create Prisoner</Button>{' '}
                    </FormGroup>
                    <Button color="secondary" onClick={toggle} type={'button'}>Cancel</Button>
                </ModalFooter>
            </AvForm>
        </Modal>

    </div>
}
export default Prisoner