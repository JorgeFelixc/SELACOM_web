import React, { useEffect } from 'react';
import './Index.css';
import { ChangeTheme, BlackTheme, WhiteTheme, ChangeURI } from '../../../Utils/Util';
import { useStateUser } from '../../Hooks/HK-user';
import useAsync from '../../Hooks/HK-async';
import { GetData, PostData } from '../../../Utils/HTTPmethods';


function Index(props){
    const [userData, dispatch] = useStateUser();


    function CallNotification(){
        let NotificationSchema = {
            titulo: "This is a title",
            descripcion: "This is a descripcion of the notification"
        }

        dispatch({
            type:"NOTIFICATION",
            newNotifications: NotificationSchema
        })

    }



    return (
        <div className="index-wrapper">
            <Login/>
            <div className="banner">
                <h2 className="banner-text">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. litia labore nam beatae.
                </h2>
            </div>
        </div>
    )
}

export default Index;






function Login(){
    const [userData, dispatch] = useStateUser();

    async function LogIn(){
        const inputs = document.getElementsByName("login");
        const login_endpoint = "http://localhost:3001/auth/login";
        let NotificationSchema = {
            titulo: "Error",
            descripcion: "Contraseña incorrecta"
        }
        let sender = new Object;
        inputs.forEach(item => { 
            sender[item.id] = item.value;
        });

        const loginService = await PostData(sender, login_endpoint);
        if(!loginService){
            dispatch({
                type:"NOTIFICATION",
                newNotifications: NotificationSchema
            });
            return;
        }

        localStorage.setItem("user",JSON.stringify(sender));
        ChangeURI("/dashboard");
    }

    return(
        <div className="login-wrapper">
        <h3 className="slogan-login">SELACOM</h3>

        <h1 className="underline">Bienvenido !</h1>
        <label className="input-general">
            <input type="text" name="login" id="username" autoComplete="false" required/>
            <span className="input-placeholder">Usuario</span>
        </label>
        <label className="input-general">
            <input type="password" name="login" id="password" autoComplete="false" required/>
            <span className="input-placeholder">Password</span>
        </label>
        <button className="loggin-button" onClick={LogIn}>Conectarse</button>
    </div>
    )
}

{/* <div className="row-text">

<button onClick={() => ChangeTheme(BlackTheme)}>Black Theme</button>
<button onClick={() => ChangeTheme(WhiteTheme)}>White Theme</button>
</div> */}
