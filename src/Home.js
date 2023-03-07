import React from "react";
import Main from "./Main";
import Login from "./Login";
import {Routes,Route} from 'react-router-dom';

const Home = () =>{
    return(
        <>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/home" element={<Main />}></Route>
          </Routes>
        </>
    )
}

export default Home;