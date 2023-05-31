import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./components/Home/home";
import {Container} from "reactstrap";
import Signup from './components/Signup/signup';
import Logout from './components/Logout/logout';
import Login from './components/Login/login';
import { ToastContainer } from 'react-toastify';
import { Protector } from './helper';
import Definition from './components/Home/definition';
import NotFound from './components/CustomNav/notFound'


function App() {
  return (
    <Container>
      <BrowserRouter> 
      <Routes>
        <Route path = '/' element ={<Protector Component={Home} />} />
        <Route path = "/home/:search"
         element ={<Definition />} />
        <Route path = '/login' element ={<Login />} />
        <Route path = '/logout' element ={<Logout />} />
        <Route path = '/signup' element ={<Signup />} />      
        <Route path = "/404" element ={<NotFound />} />
        <Route path = "*" element={<NotFound />}/>
      </Routes>
      <ToastContainer />
      </BrowserRouter>
    </Container>
  

  );
}

export default App;
