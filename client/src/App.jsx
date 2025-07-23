import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";

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
    {/* <Route path="categories" element={<Categories />}>
      
    </Route> */}
  </Routes>
  
  
  </>
}