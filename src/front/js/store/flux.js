const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			auth: false,
			data: {}
		},
		actions: {
			// Use getActions to call a function within a fuction
			login: async (email, password) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				const raw = JSON.stringify({
					"email": email,
					"password": password
				});

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", requestOptions);
					const result = await response.json();

					if (response.status === 200) {
						setStore({auth: true})
						localStorage.setItem("token", result.access_token)
						return true;
					}
				} catch (error) {
					console.log(false);
					return false;
				};
			},
			signUp: async (email, password, username, fullName, is_active) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				const raw = JSON.stringify({
					"email": email,
					"password": password,
					"username": username,
					"full_name": fullName,
					"is_active": is_active
				});
				
				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + "api/signup", requestOptions);
					console.log(response);
					const result = await response.json();
					
					if (response.status === 200) {
						setStore({auth: true})
						localStorage.setItem("token", result.access_token)
						return true;
					}
				} catch (error) {
					console.error(error);
					return false;
				};
			},
			getProfile: async () => {
				let token = localStorage.getItem("token")
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/profile", {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`
						},
					});
					if (response.status === 200) {
						const result = await response.json();
						setStore({data: result})
						return true;
					}
				} catch (error) {
					console.error(error);
					return false
				};
			},
			tokenVerify:()=>{
				//crear un nuevo endpoint que se llame verificacion de token
				//la peticion en la funcion tokenVerify del front deberia actualizar un estado auth:
				//(realizado en las funciones asíncronas) 
			},
			logout:()=>{
				//borrar el token del localStorage
				setStore({auth: false})
				localStorage.removeItem("token")
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
