import {AvForm,AvGroup, AvInput, AvFeedback} from 'availity-reactstrap-validation'
import {Button, Label, FormGroup} from 'reactstrap'
import {postRequestWithoutToken} from "../utils/Requests";
import {apiPath} from "../apiPaths/apiPath";
import {TOKEN, TOKEN_TYPE} from "../utils/constants";
import {toast} from "react-toastify";

function Login({history}) {
    const handleSubmit=(event, error, values)=> {
        postRequestWithoutToken(apiPath.login, values).then(res=>{
            if(res.status===200 && res.data) {
                localStorage.setItem(TOKEN, TOKEN_TYPE + res.data.object);
                toast.success("Successfully logged!")
                history.push("/dashboard")

            }
        }).catch(()=>{
            toast.error("Username or password is wrong!");
        });
    }

    const hStyle = { color: 'white' };

    return <div className='row d-flex align-items-center justify-content-center mt-5'>
        <div className={'col-md-4 my-5'}>
            <h3 style={hStyle} className={'text-center mt-5 mb-2'}>Login</h3>
            <AvForm onSubmit={handleSubmit}>
                <AvGroup>
                    <Label style={hStyle} for="username">Username</Label>
                <AvInput name="username" id="username" required/>
                <AvFeedback>Username must not be empty!</AvFeedback>
                </AvGroup>
                <AvGroup>
                    <Label style={hStyle} for="password">Password</Label>
                    <AvInput name="password" id="password" type="password" required/>
                    <AvFeedback>Password must not be empty!</AvFeedback>
                </AvGroup>
            <FormGroup>
                <div className={'d-flex justify-content-center align-items-center my-3'}>
                <Button color="info">Submit</Button>
                </div>
            </FormGroup>
            </AvForm>

        </div>
    </div>
}

export default Login;