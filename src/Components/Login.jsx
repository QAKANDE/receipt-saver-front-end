import React, { Component } from 'react';
import { Container, Form } from 'react-bootstrap';
import axios from "axios"
import "../css/Login.css"

class Login extends Component {
    state = {
    loginDetails: {
      email: "",
      secretKey:""
    },
    }
    updateLogin = (event) => {
         event.preventDefault()
    const loginDetails = this.state.loginDetails;
    const id = event.currentTarget.id;
    loginDetails[id] = event.currentTarget.value;
    this.setState({
      loginDetails,
    });
    }


    loginHandler = async (e) => {
        e.preventDefault()
        if (this.state.loginDetails.email === "" && this.state.loginDetails.secretKey === "") {
           alert("Please enter Log in details")
        }
        else {
            try { 
                const response = await axios.post("https://kudzayi-fam-back.herokuapp.com/users/login", {
                    email: this.state.loginDetails.email,
                    secretKey : this.state.loginDetails.secretKey
                })
                console.log(response)
                if (response.data.length === 0) {
                    alert("Please Enter Valid Credentials")
                }
                else {
                    alert("Log In Successful")
                     window.location.href = "https://kudzayi-fam.herokuapp.com/app"
                }
            } catch (error) {
               console.log(error)
            }
        }
 }
    
    // loginHandler = async (e) => {
    //     e.preventDefault()
    //     if (this.state.loginDetails.firstName === "" && this.state.loginDetails.password === "" && this.state.loginDetails.secretKey) {
    //         alert("Please Enter Login Details")
    //         console.log(this.state.loginDetails.firstName)
    //     }
    //     else {
    //         const response = await fetch("http://localhost:3003/users/login", {
    //             method: "POST",
    //         body: JSON.stringify({
    //           firstName: this.state.loginDetails.firstName, 
    //             password: this.state.loginDetails.password,
    //           secretKey:this.state.loginDetails.secretKey
    //         }) , 
    //          headers: {
    //             "Content-Type": "Application/json",
    //           },
    //         })
    //         console.log("second", this.state.loginDetails.firstName)
    //         console.log(await response.json())
    //     }
    // //     if (response.ok) {
    // //         this.setState({
    // //                loginDetails: {
    // //   firstName: "",
    // //         password: "",
    // //   token:""
    // // }
    // //         })
    // //         window.location.href = "http://localhost:3000/app"
    // //     }
    // //     else
    // //     {
    // //         alert("Something went wrong")
    // //     }
    // }
    render() { 
        return (
            <Container id="login-wrapper">
            <h3 className="text-center pt-4">Sign Into Your Account</h3>
            <Form  id="login-form" >
            <Form.Group>
              <Form.Control
                htmlFor="email"
                className="mb-4"
                type="email"
                id="email"
                value={this.state.loginDetails.email}
                placeholder="Email"
                size="md"
                onChange={(e) => this.updateLogin(e)}
              />
                           <Form.Control
                htmlFor="secretKey"
                size="md"
                id="secretKey"
                value={this.state.loginDetails.secretKey}
                onChange={(e) => this.updateLogin(e)}
                type="text"
                placeholder="Please Enter Your secretKey"
              />                
            </Form.Group>
              <div>
              <button id="login" onClick={(e) => this.loginHandler(e)}>
                Login
              </button>
            </div>
          </Form>
            </Container>
          );
    }
}
 
export default Login;