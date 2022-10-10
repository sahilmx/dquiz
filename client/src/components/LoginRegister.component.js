import React ,{useState} from "react";
import { useHistory } from "react-router-dom";
import styles from "../componentsStyles/LoginRegister.module.css";
import Login from "./Login.component";
import Register from "./Register.component";

function LoginRegister(props) {

  let history = useHistory();
  if (localStorage.getItem("loggedin")) {history.push("/");}
  const [register, setRegister] = useState(true);

  return (
    <>
    <div className={styles.container}>
     {register ? <Login {...props}/> : <Register/>}
      {/* // <Login {...props} />
      // <Register /> */}
    </div>
    <button  type ="reset" className={styles.Button} style={{display:"flex",alignitems :"centre" , border:"2px solid gray"  , padding:"1% 2% 1% 2%" , borderRadius:"3px" ,background : "black" , color:
    'white'}} onClick={ (e)=>{
        setRegister(!register);

      }}>{register? "Register" : "Login" }</button>
    </>
  );
}

export default LoginRegister;
