import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { SignUpForm } from "../component/signUpForm";

export const SignUp = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Register to access your data</h1>
			<SignUpForm/>
		</div>
	);
};
