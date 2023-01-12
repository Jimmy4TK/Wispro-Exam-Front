import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Welcome from "../welcome/Welcome";
import LoginMenu from '../menu/login/LoginMenu';
import NavBarMenu from "../menu/Navbar";
import Info from '../info/Info'
import Password from '../menu/login/Password';
import { StateLoggedInRoute } from '../common/components/LoggedInRoute';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterService from '../service/RegisterService';
import ListServices from '../service/ListServices';
import SendRequest from '../service/SendRequest';
import NoSendRequest from '../service/NoSendRequest';
import ListPendingRequest from '../isp/ListPendingRequest';
import ListRejectRequest from '../isp/ListRejectRequest';


export default function App() {
  return (
    <BrowserRouter>
              <NavBarMenu />
              <Routes>    
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<LoginMenu />} />
                <Route path="/register" element={<LoginMenu />} />
                <Route path="/newservice" element={<RegisterService />} />
                <Route path="/services" element={<ListServices />} />
                <Route path="/sendrequest" element={<SendRequest/>}/>
                <Route path="/nosendrequest" element={<NoSendRequest/>}/>
                <Route path="/pending" element={<ListPendingRequest/>}/>
                <Route path="/reject" element={<ListRejectRequest/>}/>
                <Route path="/info" element={<StateLoggedInRoute component={Info} />} />
                <Route path="/password" element={<StateLoggedInRoute component={Password} />} />
              </Routes>
      <Outlet />
    </BrowserRouter >
  );
}

