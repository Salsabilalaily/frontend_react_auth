import React, { useContext } from 'react'
import { Redirect } from 'react-router';
import { Jumbotron, Button } from 'reactstrap';
import { AuthContext } from '../App';

function HomeComp() {
    //logout
    const {state} = useContext(AuthContext)

    //belum login
    if(!state.isAuthenticated){
        return <Redirect to="/login" />
    }
    if(state.role === 1){
        return <Redirect to="/admin" />
    }
    else if(state.role === 2){
        return <Redirect to="/staff" />
    }
    else if(state.role === 3){
        return <Redirect to="/member" />
    }

    return ( //return ke halaman member
        <div>
            <Jumbotron>
                <h1 className="display-3">Hello, Halaman Role {state.role} yaitu {state.user}</h1>
                <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-2" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <p className="lead">
                    <Button color="primary">Learn More</Button>
                </p>
            </Jumbotron>
        </div>
    )
}
export default HomeComp