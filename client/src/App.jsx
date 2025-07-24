import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import About from "./screens/About";
import Contact from "./screens/Contact";

export default function App(){
  return <>
  {/* <Navbar /> */}
  <Routes>
    <Route path="/" element={<Home />}>

    </Route>
    <Route path="login" element={<Login />}>
      
    </Route>
    <Route path="register" element={<Register />}>
      
    </Route>
    <Route path="about" element={<About />}>
      
    </Route>
    <Route path="contact" element={<Contact />}>
      
    </Route>
  </Routes>
  
  
  </>
}