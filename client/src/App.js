import React, {useState} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import  Login  from "./components/Login";
import  Register  from "./components/Register";
import  Homepage  from "./components/Homepage";
import  Newcontact  from "./components/Newcontact";
import  Individual  from "./components/Individual";
import  EditContact  from "./components/EditContact";





const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/newcontact" element={<Newcontact />} />
            <Route path="/details/:id" element={<Individual />} />
            <Route path="/edit/:id" element={<EditContact />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;