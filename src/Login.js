import React,{useState,useEffect} from "react";
import Loading from "./Loading";
import './Login.css';

const Login = () =>{
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      setTimeout(() => setLoading(false), 2500)
    }, [])
    let [userName , setUserName] = useState("") 
    let [password , setPassword] = useState("")
    const handleEmail = (e) => {
         setUserName(e.target.value)
    }
    const handlePassword = (e) =>{
        setPassword(e.target.value)
    }


    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(userName)
        console.log(password)
        if(userName == "mahamishtiaq2000@gmail.com" && password == "123"){
            window.location="/home"
        }
        else{
            alert("UserName or password is incorrect")
            window.location.reload(true);
            }
    }
    
    return(
        <>
         {loading === false ? (
                <div className="loginMainDiv">
                <div>
                    <p className="logoMianHeading">Driver's Fuel <br></br>Tracker</p>
                </div>
                <hr></hr>
                <div >
                    <div className="loginMainForm">
                        <h4>Login Form</h4>
                        <form className="labelsLogin" onSubmit={handleSubmit}>
                            <label>User Name : </label>
                            <br></br>
                            <br></br>
                            <input type="text" name="username" placeholder="Enter your user name" onChange={handleEmail}></input>
                            <br></br>
                            <br></br>
                            <label>Password : </label>
                            <br></br>
                            <br></br>
                            <input type="password" name="password" placeholder="Enter your password" onChange={handlePassword}></input>
                            <br></br>
                            <br></br>
                            <br></br>
                            <button type="submit">Login</button>
                        </form>
                    </div>
                    
                </div>
            </div>
      ) : (
        <Loading />
      )}
            
        </>
    )
}

export default Login;