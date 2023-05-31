Name                  : Meo Angelo Z. Alcantara
Course Code & Section : ITE18 - GP1

Title: Next.js Login with Strapi User Authentication Step-by-Step Process

Introduction: In this tutorial, we will walk through the process of setting up user authentication in a Next.js app using Strapi as the back-end. Strapi is a headless CMS that allows for easy API creation and management.

Prerequisites:

-   Basic knowledge of JavaScript and Next.js
-   Familiarity with Strapi
-   Node.js and NPM installed on your system
-   Strapi project set up with user roles and permissions configured
-   Next.js project initialized

Title 1: Step A: Installation of Prerequisites
-Install LTS Node or either 14> || <16 for Strapi Configuration
-Install VSCode which is an IDE

Title 3: Configuration Strapi Project
Step A. Prerequisite Requirements 
Install Strapi Project to your Computer Device with prerequisite that the nodes > 14 but less than 16 version.
Preffered Package Manager: npm

Step B: Installation (Strapi)
//Create a directory and install the dependencies of strapi api
- npx create-strapi-app@latest strapi-project
- npm install
//For any updates that might affect Strapi API
- npm rebuild
//To Run Strapi and Produce Localhost link for further configuration
- npm run develop
    - localhost:1337/admin   //admin panel
    - localhost:1337/       //server side link

Step C: Configuration of API Contents in Strapi
A. Content Manager
    1. User - This part records or register the users and allows authentication whenever there is fetch function of the token
    2. LNovel (Light Novels) - Possible Contents of mythe app/website
    3. Home - Home
B. Content Type Builder (Important Feature to Enable)
    1. Enable Email and Password
C. Create API (Endpoint) Token
    1. Create New Entry
    -Name: LNovel 
    -Duration: Unlimited
    -Access: Full Access
    -Save
D. Roles and Permission
    A. User
    -Enable/Check

-------------------------------------------------------------------
Topic 2: React.Js Configuration
Step 1. Installation of Frontend Packages and others
A. Creating a Directory for the frontend servers
- For Reactjs -> npm init react-app reactjs
- For Nuxt -> npx create-nuxt-app <project-name>
- For Next ->npx create-next-app <project-name>

B. Installing Dependicies
- npm install for both server to install all the dependencies to complete package tools or modules that could be used for the project
-npm install 

C. Executing Scripts for both server
-npm start (For ReactJs)
-npm run develop (For Nuxt and Next Frameworks)
-displayed the localhost:3000/
-envoking clear to the terminal for every need of compilation

D. Configuring Packages or Files in the React.js
(A). Initialization of Routes 
This step initialized the later pages to allow routing or the ability to link with other pages and display their feature.

A. App.js 
-component in a React application that provides the overall structure and behavior of the app, and serves as the entry point for all other components.
Code Snippet: 
        import {BrowserRouter, Route, Routes} from 'react-router-dom';
        import Home from "./components/Home/home";
        import {Container} from "reactstrap";
        import Signup from './components/Signup/signup';
        import Logout from './components/Logout/logout';
        import Login from './components/Login/login';
        import { ToastContainer } from 'react-toastify';
        //This particular import adds additional feature of having protected route or page
        import { Protector } from './helper';

        function App() {
        return (
            <Container>
            <BrowserRouter> 
            <Routes>
                <Route path = '/' element ={<Protector Component={Home} />} />
                <Route path = '/login' element ={<Login />} />
                <Route path = '/logout' element ={<Logout />} />
                <Route path = '/signup' element ={<Signup />} />      
            </Routes>
            <ToastContainer />
            </BrowserRouter>
            </Container>

        );
        };

        export default App;

B. Helper.js 
- Additional Feature to the Website. Including storing of JWT token, Protect Route Configuration.
Code Snippet:

        import React, { useEffect } from "react";
        import { useNavigate } from "react-router-dom";

        //Storing JWT Token 
        export const storeUser = (data) => {
            localStorage.setItem("user", JSON.stringify({
                username: data.user.username,
                jwt: data.jwt
            }))
        }


        export const userData = () =>{
            const stringifiedUser = localStorage.getItem('user') ||'""' ;
            return JSON.parse(stringifiedUser || {});
            
        };

        //For Protecting Route (Home)
        export const Protector = ({ Component }) => {
            const navigate = useNavigate();

            const {jwt} = userData();

            useEffect(() => {
            if (!jwt){
                navigate('/login' );
            }
            }, [navigate, jwt]);
            
            return <Component/>;
        };

Title: Pages/Components of the App/Website
Prior Requirements:
-For conveniency and for better organization allow creating a folder for components where the functionalities behind the website will be stored
-Must be relocated or made inside the src code as React js does not allow compilation outside of /src

1. Home Page (Display the Home Page and also is the protected page of the app/website)
A. CustomNav
- A particular component that allows unique feature for the Home Page. This features include dynamic button such as toogles. The button particularly could be seen when the screen is minimized.
Code Snippet: 

        import React, { useState } from 'react'
        import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


        const CustomNav = () =>{
            //Function to Integrate Action to the Navigation Bar
            const [isOpen, setIsOpen] = useState(false)
            const toggle = () => setIsOpen(!isOpen)
            
            //Design and Feature of the Toogle
            return(
                <div className='custom-nav'>
                <Navbar color="faded" light expand="md">
                <NavbarBrand href="/" className="mr-auto">My App</NavbarBrand>
                <NavbarToggler onClick={toggle} className="nr-2" />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                    <NavItem>
                        <NavLink href="/logout">Logout</NavLink>
                    </NavItem>
                    </Nav>
                </Collapse>
                </Navbar>
                </div>
            
            );
        
        };

        export default CustomNav;

B. Index.css Code Snippet (To Display and To Design the toggle when the Screen is Minimized)
        /* Nav */
        .custom-nav .collapse{
        justify-content: flex-end;

        }
        /* End Nav */

 

 2. Login Page
 -This page showcase the authentication system that allows the user to either access the page or not if not the credentials are not successfully authenticated.

 A. Code Snippet of the Functionality of the Login System/Page
        import React, { useState } from 'react'
        import {Col, Button, FormGroup, Input, Row} from 'reactstrap';
        import axious from "axios";
        import { toast } from "react-toastify";
        import { Link, useNavigate } from 'react-router-dom';
        import { storeUser } from '../../helper';

        const initialUser = {password: "", identifier: ""};

        const Login = () => {
            //Function to enable navigate functionality
            const [user, setUser] = useState(initialUser);
            const navigate = useNavigate();

            //Function to Handle User Inputs
            const handleChange = ({target}) => {
                const {name, value} = target
                setUser((currentuser) => ({
                ...currentuser,
                [name]: value,
                }));
            };
           
            //Posting Data and Fetching JWT for Authentication
                const handleLogin = async() => {
                const url = 'http://localhost:1337/api/auth/local';    
                    try{
                        if (user.identifier && user.password)
                        {
                            const {data} = await axious.post(url, user);
                            if (data.jwt){
                            storeUser(data);
                            toast.success('Logged in Successfully!', {
                                hideProgressBar: true,
                            })
                            setUser(initialUser);
                            navigate('/');
                            }
                        }
                    }catch (error){
                        toast.error(error.message, {
                            hideProgressbar: true,
                        })
                    }


                };
            //Front End Functionality of the Login Page
            return (
                <Row className='Login'>
                    <Col sm="12" md={{size: 4, offset: 4}}>
                        <div>
                            <h2>Login: </h2>
                            <FormGroup>
                                <Input type="email" name="identifier" value={user.identifier} onChange={handleChange} placeholder="Enter Email or Username" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter Password" />
                            </FormGroup>
                            <Button color ="primary" onClick={handleLogin}> Login</Button>
                            <h6>
                                Click <Link to ='/signup'> Here </Link> to Sign Up
                                
                            </h6>
                        </div>
                    </Col>
                </Row>
                
            );
        };

        export default Login;
B. FrontEnd Display Code Snippet
        /* Login */
        .Login {
        min-height:100vh;
        align-items:center;
        background: linear-gradient(
            90deg, 
            rgba(2,0,36,0) 20%,
            rgba(27,146,196, 1) 56%,
            rgba(2,0,36,1) 73%
        )
        }

        .Login h6{
        margin-top: 15px;
        }

3. Signup Page
-This page allows the user to register their credentials for authentication in the login page. This page retrieves and records their data in Strapi API.

A. Code Implementation of Registration/SignUp Page
        import axios from "axios";
        import React, { useState} from "react";
        import { useNavigate } from "react-router-dom";
        import { toast } from "react-toastify";
        import {Col, Button, FormGroup, Input, Row } from 'reactstrap';

        //Function to Handle User Inputs
        const initialUser ={email:"", password:"", username:""};
        const Signup = () => {
        const [user, setUser] = useState(initialUser); 
        const navigate = useNavigate();

        //Post and Stored Credentials to the Strapi User Content Manager 
        const signUp = async() => {
            try{
            const url = 'http://localhost:1337/api/auth/local/register'; 
            if(user.username && user.email && user.password)
            {
                const res = await axios.post(url, user);
                if (res)
                {
                    setUser(initialUser);
                    navigate('/login');
                }
            }
            } catch (error) {
            toast.error(error.message,{
                hideProgressBar: true,
            })
            }

        };
        
        //Handles User Input
        const handleUserChange = ({target}) => {
            const {name, value} = target;
            setUser((currentUser) => ({
            ...currentUser,
            [name]: value,

            }));
        };
        
        //FrontEnd functionality 
        return (
            <Row className="signup">
            <Col sm='12' md={{size: 4, offset: 4}}>
                <div>
                <h2>Sign Up: </h2>
                //Forms - to allow inputs for necessary data or information
                <FormGroup>
                            <Input type="text" name="username" value={user.username} onChange={handleUserChange} placeholder="Enter Your Full Name" />
                </FormGroup>
                <FormGroup>
                            <Input type="email" name="email" value={user.email} onChange={handleUserChange} placeholder="Enter Email" />
                </FormGroup>
                <FormGroup>
                            <Input type="password" name="password" value={user.password} onChange={handleUserChange} placeholder="Enter Password" />
                </FormGroup>
                <Button color = "primary" onClick ={signUp}>Sign Up</Button>
                </div>
            </Col>
            </Row>
        );
        };

        export default Signup; 

B. FrontEnd CSS SignUp Configuration
        /*SignUp*/
        .signup {
        min-height:100vh;
        align-items:center;
        background: linear-gradient(
            90deg, 
            rgba(2,0,36,0) 30%,
            rgba(27,146,196, 1) 56%,
            rgba(2,0,36,1) 73%
        );
        }

4. Logout Page
- This page allows the user to delete their login records and protects their information 
-Redirects back to Login back once the JWT is release or deleted

A. Code Implementation
        import React, { useEffect } from "react";
        import { useNavigate } from 'react-router-dom';

        const Logout = () => {
            
            const navigate = useNavigate();
            useEffect(() => {
            localStorage.setItem('user',"")
                navigate("/login");
            
            }, [navigate]);
            
        
            return null;
        };

        export default Logout;