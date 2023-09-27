import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
export default function Home() {
    const navigate = useNavigate()
    useEffect(()=>{
        const logged = JSON.parse(localStorage.getItem("loggedUser"));
    if(logged){
            navigate(`todo/${logged}`);
        }
        else{
            navigate("/login");
        }
    },[]);
  return (
    <></>
  )
}
