import React, { useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Profile = () => {
    const { store, actions } = useContext(Context);

    let navigate = useNavigate();

    useEffect(()=>{
        actions.getProfile()
        !store.data.email ? navigate("/") : null
    },[])

    return (
        <div className="text-center mt-5">
            <h1>Profile</h1>
            {store.data.email ? 
            <>
                <h2>{"Email: " + store.data.email}</h2>
                <h2>{"Username: " + store.data.username}</h2>
                <h2>{"Name: " + store.data.full_name}</h2>
            </>
            : null
            }
        </div>
    );
};
