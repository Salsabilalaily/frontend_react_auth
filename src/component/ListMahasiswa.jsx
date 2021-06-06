import React, { useEffect, useState, useContext } from 'react'
import { Container, Table, Button } from 'reactstrap'
import axios from 'axios'
import {AuthContext} from '../App'
import { Redirect } from 'react-router'

const api = 'http://localhost:3001'

function ListMahasiswa() {

    //data mhs dlm state
    const [mahasiswa, setMahasiswa] = useState([])

    //state data global app js
    const {state, dispatch} =useContext(AuthContext)

    //ambil data dari rest api
    const fetchData = () => {
        var config={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ state.token
            }
        }

        axios.get(api + '/auth/api/v1/admin/mahasiswa', config)
        .then(res=>{
            setMahasiswa(res.data.values)
        })
        .catch(e => {
            console.log(e)
        })
    }

    //durasi waktu jwt
    const timeout = () => {
        setTimeout(()=>{
            console.log("Token telah berakhir")
            dispatch({
                type: "LOGOUT"
            })

        }, state.tokenExpires)
    }

    //load otomatis
    useEffect(()=>{
        fetchData()
        //eslint-disable-next-line
        timeout()
        //eslint-disable-next-line
    }, [])

    //belum login, cek otentikasi
    if(!state.isAuthenticated){
        return <Redirect to="/login" />
    }

    return (
        <Container>
            <h2>Data Mahasiswa</h2>
            <Button color="success">Tambah Data</Button>
            <hr />
            <Table className="table-bordered">
                <thead>
                    <tr>
                        <th>NIM</th>
                        <th>Nama</th>
                        <th>Jurusan</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {mahasiswa.map(mahasiswa =>
                        <tr key={mahasiswa.id_mahasiswa}>
                            <td>{mahasiswa.nim}</td>
                            <td>{mahasiswa.nama}</td>
                            <td>{mahasiswa.jurusan}</td>
                            <td>
                                <Button>Edit</Button>
                                <span> </span>
                                <Button color="danger">Hapus</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    )
}
export default ListMahasiswa