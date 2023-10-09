import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import LogRocket from 'logrocket'; 
import AdminService from "./admin.service";

LogRocket.init('app/id');
function App() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse)
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
          console.log("User is : ", user)
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                        createUser(res.data.name, res.data.email)
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };
    const createUser = (name, email) => {
        console.log("userDetails is : ", name, " , ", email);
        const data = {
                u_name: name,
                u_email: email,
                u_block: "No"
            }
            AdminService.create(data)
              .then((response) => {
                alert("User updated in DB")
                //setUsers(response.data);
              })
              .catch((e) => {
                console.log(e);
              });
        
    }

    return (
        <div>
            <h2><center>React Google Login</center></h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt=""/>
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <center>
                <img src={require('./sign_in_with_google.png')} width="300" alt="" onClick={() => login()}/>
                </center>
            )}
        </div>
    );
}
export default App;