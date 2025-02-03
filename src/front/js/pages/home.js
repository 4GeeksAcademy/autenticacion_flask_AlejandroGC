import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { LoginForm } from "../component/loginForm";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Home!!</h1>
		</div>
	);
};
