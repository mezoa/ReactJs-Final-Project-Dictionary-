import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

//Handles the logout functionality. 
//It performs certain actions and redirects the user to the login page.
const Logout = () => {
    
    const navigate = useNavigate();
    useEffect(() => {
      //It clears the stored user information
      localStorage.setItem('user',"")
      //redirect to the login page  
      navigate("/login");
      
    }, [navigate]);
    
  
    return null;
};

export default Logout;