
import React from "react";
import {
    Switch,
    Route,
    Routes,
    Link
} from "react-router-dom";


import Header from '../Layout/Header'
import Question from "../components/Question/Question";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

const RoutesComponent = () => (
    <Routes>
        <Route path="/" exact element={<Question />} />
        <Route path="/auth">
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />

        </Route>
        {/* <Route path="/login" element={<Auth />} /> */}

    </Routes>

)

export default RoutesComponent
