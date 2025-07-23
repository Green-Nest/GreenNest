import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Navbar from "./components/Navbar";

export default function App(){
  return <>
  {/* <Navbar /> */}
  <Routes>
    <Route path="/" element={<Home />}>

    </Route>
    {/* <Route path="login" element={<Login />}>
      
    </Route>
    <Route path="register" element={<Register />}>
      
    </Route>
    <Route path="categories" element={<Categories />}>
      
    </Route> */}
  </Routes>
  
  
  </>
}