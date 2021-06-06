import React, { Fragment, useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../App'
import { Button, Row, Col, Form, FormGroup, Label, Input, CardImg, Card } from 'reactstrap';
import { Link } from 'react-router-dom';
// import Recaptcha from 'react-google-recaptcha';


const qs = require('querystring')

const api = 'http://localhost:3001'

var Recaptcha = require('react-recaptcha');

function LoginComp(props) {

    const { dispatch } = useContext(AuthContext)
    const initialState = {
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: null,
        isVerified: false //centang button recaptcha
    }

    const [data, setData] = useState(initialState)

    //recaptcha
    // specifying your onload callback function
    var callback = function () {
        console.log('Done!!!!');
    };

    // specifying verify callback function
    var verifyCallback = function (response) {
        console.log(response);
        if(response){
            setData({
                ...data,
                isVerified: true
            })
        }
    };

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleFormSubmit = event => {
        event.preventDefault()

        if(data.isVerified){
            setData({
                ...data,
                isSubmitting: true,
                errorMessage: null
            })
    
            const requestBody = {
                email: data.email,
                password: data.password
            }
    
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
    
            axios.post(api + '/auth/api/v1/login', qs.stringify(requestBody), config)
                .then(res => {
                    if (res.data.success === true) {
                        dispatch({
                            type: "LOGIN",
                            payload: res.data
                        })
    
                        //redirect to dashboard
                        props.history.push("/dashboard")
                    } else {
                        setData({
                            ...data,
                            isSubmitting: false,
                            errorMessage: res.data.Message
                        })
                    }
    
                    throw res
                })
        }else {
            alert('Anda diduga robot!')
        }

        
    }

    return (
        <Fragment>
            <br />
            <Row>
                <Col>
                    <Card>
                        <CardImg width="100%" src="http://placeimg.com/640/380/arch" className="card-img card-img" alt="img" />
                    </Card>
                </Col>
                <Col>
                    <h1>Login Form</h1>
                    <hr />
                    <Form onSubmit={handleFormSubmit}>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email"
                                value={data.email}
                                onChange={handleInputChange}
                                name="email" id="exampleEmail"
                                placeholder="with a placeholder" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password"
                                value={data.password}
                                onChange={handleInputChange}
                                name="password" id="examplePassword" placeholder="password placeholder" />
                        </FormGroup>

                        <Recaptcha
                            sitekey="6LekpRcbAAAAAFjozSFGfYXRLMwTMTYv3xyixT61"
                            render="explicit"
                            verifyCallback={verifyCallback}
                            onloadCallback={callback}
                        />

                        <br />

                        {data.errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                {data.errorMessage}
                            </div>
                        )}
                        <Button disabled={data.isSubmitting}>
                            {data.isSubmitting ? (
                                "..Loading"
                            ) :
                                (
                                    "Login"
                                )
                            }
                        </Button>
                    </Form>
                    <p>Belum punya akun? <Link to="/register">Register</Link></p>
                </Col>
            </Row>
        </Fragment>
    )
}
export default LoginComp