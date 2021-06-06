import React, { Fragment, useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../App'
import { Button, Container, Row, Col, Form, FormGroup, Label, Input, CardImg, Card } from 'reactstrap';
import { Link } from 'react-router-dom';

const qs = require('querystring')

const api = 'http://localhost:3001'

function RegisterComp() {

    const { dispatch } = useContext(AuthContext)
    const initialState = {
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: null
    }

    const [data, setData] = useState(initialState)

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleFormSubmit = event => {
        event.preventDefault()
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
                } else {
                    setData({
                        ...data,
                        isSubmitting: false,
                        errorMessage: res.data.Message
                    })
                }

                throw res
            })
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
                    <h1>Register Form</h1>
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
                        <FormGroup>
                            <Label for="exampleName">Name</Label>
                            <Input type="text" name="Name" id="exampleName" placeholder="name placeholder" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Jurusan</Label>
                            <Input type="select" name="select" id="exampleSelect">
                                <option>Teknologi Rekayasa Perangkat Lunak</option>
                                <option>Teknologi Rekayasa Elektro</option>
                                <option>Teknologi Rekayasa Internet</option>
                                <option>Sistem Informasi</option>
                                <option>Multimedia</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Address</Label>
                            <Input type="textarea" name="text" id="exampleText" />
                        </FormGroup>

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
                                    "Register"
                                )
                            }
                        </Button>
                    </Form>
                    <p>Sudah punya akun? <Link to="/login">Login</Link></p>
                </Col>
            </Row>
        </Fragment>
    )
}
export default RegisterComp