import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";
import axiosClient from "../config/axiosClient";
import { useAuth } from "../hooks/useAuth";


export function Login () {

    const [ email, setEmail ]       = useState('');
    const [ password, setPassword ] = useState('');
    const [ alert, setAlert ]       = useState({});

    const { setAuth } = useAuth();

    const navigate = useNavigate();


    const handleSubmit = async ( e ) => {
        e.preventDefault();
        
        if ([ email, password ].includes('') ) {
            setAlert({
                message: 'Todos los campos son obligatorios',
                error: true,
            });
        }

        setAlert({});

        try {

            const { data } = await axiosClient.post(`/users/login`, {
                email,
                password
            });

            localStorage.setItem('token', data.token );

            setAuth( data );
            navigate('/projects');
            
        } catch ( error ) {
            setAlert({
                message: error.response.data.message,
                error: true,
            });
        }
    }

    const { message } = alert;

    return (
        <>
            <h1 className="text-[#0d0d0d] text-4xl uppercase text-center font-bold"> Inicia Sesión </h1>
            <p className="text-[#d9376e] font-bold uppercase text-center"> Administra tus proyectos </p>

            <form   onSubmit={ handleSubmit }
                    className="my-10 bg-[#fffffe] shadow rounded-lg px-10 py-5 border-2 border-transparent border-b-[#d9376e]">
                
                { message && <Alert alert={ alert } />}

                <div className="my-5">
                    <label className="uppercase block"
                            htmlFor="email"> 
                            Correo Electrónico 
                    </label>
                    <input
                        id="email" 
                        type="email"
                        name="email"
                        placeholder="correo@correo.com"
                        className="w-full mt-3 p-3 border rounded-lg focus:outline-none"
                        value={ email }
                        onChange={ e => setEmail( e.target.value ) }
                    />
                </div>

                <div className="my-5">
                    <label className="uppercase block"
                            htmlFor="password"> 
                            Contraseña 
                    </label>
                    <input
                        id="password" 
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        className="w-full mt-3 p-3 border rounded-lg focus:outline-none"
                        value={ password }
                        onChange={ e => setPassword( e.target.value ) }
                    />
                </div>

                <button type="submit"
                        className="bg-[#2e69fe] text-[#fffffe] w-full py-3 my-3 uppercase font-bold rounded-lg cursor-default">
                    Iniciar Sesión
                </button>

            </form>

            <nav className="lg:flex lg:justify-between">
                <Link   to="signup"
                        className="block text-center my-5 text-sm">
                    ¿No tienes una cuenta? <span className="text-[#2e69fe]"> Regístrate </span>
                </Link>

                <Link   to="password-reset"
                        className="block text-center my-5 text-sm">
                    ¿Olvidaste tu contraseña
                </Link>
            </nav>
        </>
    )
}