import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const SignUpForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [fullName, setFullName] = useState("")
    const {store,actions} = useContext(Context)

    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()
        let signUp =  actions.signUp(email,password,username,fullName);
        console.log(signUp)
        if (signUp) {
                navigate("/home")
        }
        
    }

    return (
        <form onSubmit={handleSubmit} className="mx-auto w-50">
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setEmail(e.target.value)} value={email} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=>setPassword(e.target.value)} value={password} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleUserName" className="form-label">User Name</label>
                <input type="text" className="form-control" id="exampleUserName" aria-describedby="usernameHelp" onChange={(e)=>setUsername(e.target.value)} value={username} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFullName" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="exampleFullName" aria-describedby="usernameHelp" onChange={(e)=>setFullName(e.target.value)} value={fullName} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};