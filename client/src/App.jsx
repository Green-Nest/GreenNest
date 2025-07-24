import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import About from "./screens/About";
import Contact from "./screens/Contact";
import IndoorPlants from "./screens/IndoorPlants";
import OutdoorPlants from './screens/OutdoorPlants';
import PlantersAndTools from './screens/PlantersAndTools';

// import AdminPage from "./screens/AdminPage";
// import EditDeleteProduct from "./screens/EditDeleteProduct";
// import ProductManager from "./screens/ProductManager";
// import CustomerManager from "./screens/CustomerManager";
// import OrderManager from "./screens/OrderManager";
// import AdminDashboard from "./screens/AdminDashboard";

export default function App(){
  return <>
  {/* <Navbar /> */}
  <Routes>
    {/* <Route path="adminPage" element={<AdminPage/>}/>
    <Route path="editDeleteProduct" element={<EditDeleteProduct/>}/>
    <Route path="productManager" element={<ProductManager/>}/>
    <Route path="customerManager" element={<CustomerManager/>}/>
    <Route path="orderManager" element={<OrderManager/>}/>
    <Route path="adminDashboard" element={<AdminDashboard/>}/> */}
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

    <Route path="/indoor-plants" element={<IndoorPlants />} >
    </Route>

    <Route path="/outdoor-plants" element={<OutdoorPlants />}>
    </Route>

    <Route path="/planters-tools" element={<PlantersAndTools />}>
    </Route>

  </Routes>
  
  
  </>
}