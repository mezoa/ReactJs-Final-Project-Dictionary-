import React, { useState } from 'react';
import { Col, Button, FormGroup, Input, Row } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { storeUser } from '../../helper';

const initialUser = { name: '', email: '', password: '' };
//Sign-up related functionality
const SignUp = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();
  
  //Manages the User Input
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  //Sign-up Functionality
  const handleSignUp = async () => {
    //API Endpoint
    const url = 'http://localhost:1337/api/auth/local/register';
    try {
      //It sends an object containing the user's name, email, and password as the request payload.
      if (user.name && user.email && user.password) {
        const { data } = await axios.post(url, {
          username: user.name,
          email: user.email,
          password: user.password
        });
        if (data.jwt) {
          storeUser(data);
          toast.success('Signed up successfully!', {
            hideProgressBar: true,
          });
          setUser(initialUser);
          navigate('/');
        }
      }
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

  //Signup Form that handles the email or username, and password
  //Displays frontend functionality
  return (
    <div className="signup-container">
      <Row className="signup-row">
        <Col sm="12" md={{ size: 4, offset: 4 }}>
          <div className="signup-box">
            <h2>Sign Up:</h2>
            <FormGroup>
              <Input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Enter Name"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter Email"
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
            <Button color="white" onClick={handleSignUp}>
              Sign Up
            </Button>
            <h6>
              Already have an account? <Link to="/login">Login</Link>
            </h6>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
