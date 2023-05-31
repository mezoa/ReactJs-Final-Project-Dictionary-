import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Additional Features Found in the Website
//Stores user information in the browser's localStorage after a successful login or sign-up process
export const storeUser = (data) => {
    localStorage.setItem("user", JSON.stringify({
        username: data.user.username,
        jwt: data.jwt
    }))
}

//Retrieval of the users data stored in the browser's localStorage. 
export const userData = () =>{
    const stringifiedUser = localStorage.getItem('user') ||'""' ;
    return JSON.parse(stringifiedUser || {});
    
};

//Checks if the user is authenticated
//Protector component can be used to protect certain routes or components in an application, ensuring that only authenticated users can access them.
export const Protector = ({ Component }) => {
    const navigate = useNavigate();

    const {jwt} = userData();
    //Not Authenticated User will be redirected to the Login Page
    useEffect(() => {
    if (!jwt){
        navigate('/login' );
    }
    }, [navigate, jwt]);
    
    return <Component/>;
};