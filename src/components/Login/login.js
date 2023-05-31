import React, { useState } from 'react';
import { Col, Button, FormGroup, Input, Row } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { storeUser } from '../../helper';

const initialUser = { password: '', identifier: '' };

const Login = () => {
  //Declaration of Variables 
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  //A change event by user interaction or input of name and value for password
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  //Handles Login Functionality
  const handleLogin = async () => {
    //Url for posting data from the change event to Strapi
    const url = 'http://localhost:1337/api/auth/local';
    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);
        if (data.jwt) {
          //Stores the user's data or authentication in the application state or local storage
          storeUser(data);
          //Toast Function simply to indicate that the user is successfully logged in 
          toast.success('Logged in Successfully!', {
            hideProgressBar: true,
          });
          //Reset the User input fields and redirect to the protected route(Home Page)
          setUser(initialUser);
          navigate('/');
        }
      }
      //Catching Errors
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

  //Login Form that handles the email or username, and password
  //Displays frontend functionality
  return (
    <div className="login-container">
      <Row className="login-row">
        <Col sm="12" md={{ size: 4, offset: 4 }}>
          <div className="login-box">
            <h2>Login:</h2>
            <FormGroup>
              <Input
                type="email"
                name="identifier"
                value={user.identifier}
                onChange={handleChange}
                placeholder="Enter Email or Username"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter Password"
              />
            </FormGroup>
            <Button color="orange" onClick={handleLogin}>
              Login
            </Button>
            <h6>
              Click <Link to="/signup">Here</Link> to Sign Up
            </h6>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
