import React, { useContext} from 'react';
// import {
//     Collapse,
//     Navbar,
//     NavbarToggler,
//     NavbarBrand,
//     Nav,
//     NavItem,
//     NavbarText,
//     Button
// } from 'reactstrap';
import { AuthContext } from '../App';
// import { NavLink } from 'react-router-dom'
import MenuPublik from './Menu/MenuPublik';
import MenuMember from './Menu/MenuMember';
import MenuAdmin from './Menu/MenuAdmin';
import MenuStaff from './Menu/MenuStaff';

function MenuComp() {

    //logout
    const { state} = useContext(AuthContext)

    //BELUM LOGIN
    if (!state.isAuthenticated) {
        return (
            <MenuPublik />
        )
    }
    if (state.role === 1){
        <MenuAdmin />
    }
    else if (state.role === 2){
        <MenuStaff />
    }

    return (
        <MenuMember />

    )
}
export default MenuComp