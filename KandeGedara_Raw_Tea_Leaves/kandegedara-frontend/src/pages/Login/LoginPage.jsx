import React from 'react';
import './../../styles/login.css'
import Logo from '../../assets/image/logo/logo.svg'
import transImg from '../../assets/image/transaction.svg'
import axios from "axios";
import Sweetalert2 from "sweetalert2";

function LoginPage() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function checkAuthentication() {
        const data = {
            email: email,
            password: password
        }
        axios.post("http://localhost:8000/api/v1/auth/login", data).then((res) => {
            console.log(res.data);
            if (res.data.message === true) {
                window.location.href = "admin/dashboard";
            } else {
                Sweetalert2.fire({
                    title: "Error",
                    text: `${res.data.message}`,
                    icon: "error",
                    confirmButtonText: "OK"
                });
                setEmail("");
                setPassword("");
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="loginForm">
            <img src={transImg} alt="transImage" id="transImg"/>
            <div className="container-fluid col-4 h-75 formMainDiv">
                <img
                    src={Logo}
                    alt="logo" className="col-3" width="100" id="logoImage"/>
                <div className="formDiv">
                    <form className="text-center">
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" className="form-control col-6" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }}/>
                        </div>
                        <div className="mb-4 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" value={password}
                                   onChange={(e) => {
                                       setPassword(e.target.value)
                                   }}/>
                        </div>
                        <button type="button" className="btn btn-outline-success btnLogin col-4 align-self-center"
                                onClick={() => {
                                    checkAuthentication()
                                }}>Sign
                            In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;