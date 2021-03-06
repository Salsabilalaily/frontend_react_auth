import React, { useReducer, createContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MenuComp from './component/MenuComp'
import HomeComp from './component/HomeComp'
import RegisterComp from './component/RegisterComp'
import LoginComp from './component/LoginComp'
import Transaksi from './component/Transaksi'
import Publik from './component/Publik'
import ListMahasiswa from './component/ListMahasiswa'
import RoleAdmin from './RoleAkses/RoleAdmin'
import RoleStaff from './RoleAkses/RoleStaff'
import RoleMember from './RoleAkses/RoleMember'

//   case value:
    
//     break;

//   default:
//     break;
// }}

//Context
export const AuthContext = createContext()

//inisiasi state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  tokenExpires: 0,
  role: 0
}

//fungsi reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem("token", JSON.stringify(action.payload.user))
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        tokenExpires: action.payload.expires,
        role: action.payload.role
      }

    case "LOGOUT":
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    default:
      return state
  }
}

function App() {
  //buat reducer jadi data global
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <BrowserRouter>
      <Switch>
        <AuthContext.Provider value={{
          state,
          dispatch
        }}>
          <MenuComp />
          {/* {!state.isAuthenticated ?
            <Redirect
              to={{
                pathname: "/"
              }}
            /> :
            <Redirect
              to={{
                pathname: "/homepage"
              }}
            />
          } */}

          {/* <Route exact path="/" component={LoginComp} />
          <Route exact path="/homepage" component={HomeComp} /> */}
          <Route exact path="/" component={Publik} />
          <Route exact path="/login" component={LoginComp} />
          <Route exact path="/dashboard" component={HomeComp} />
          <Route exact path="/transaksi" component={Transaksi} />
          <Route exact path="/register" component={RegisterComp} />
          <Route exact path="/mahasiswa" component={ListMahasiswa} />
          <Route exact path="/admin" component={RoleAdmin} />
          <Route exact path="/staff" component={RoleStaff} />
          <Route exact path="/member" component={RoleMember} />
        </AuthContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
