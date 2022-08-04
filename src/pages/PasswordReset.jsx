import { useState } from "react"
import { Link } from "react-router-dom"
import { Alert } from "../components/Alert";
import axiosClient from "../config/axiosClient";


export function PasswordReset () {

    const [ email, setEmail ]   = useState('');
    const [ alert, setAlert ]   = useState({});

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        
        if ( email === '' || email.length < 6 ) {
            setAlert({
                message: 'El correo electrónico es obligatorio',
                error: true,
            });
            return;
        }

        setAlert({});

        try {

            const { data } = await axiosClient.post(`/users/password-reset`, { email });

            setAlert({
                message: data.message,
                error: false,
            });
            
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
            <h1 className="text-[#0d0d0d] text-4xl uppercase text-center font-bold"> Recuperar contraseña </h1>

            <form   onSubmit={ handleSubmit } 
                    className="mt-3 bg-[#fffffe] shadow rounded-lg px-10 py-5 border-2 border-transparent border-b-[#d9376e]">

                { message && <Alert alert={ alert }/> }

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

                <button type="submit"
                        className="bg-[#2e69fe] text-[#fffffe] w-full py-3 my-3 uppercase font-bold rounded-lg cursor-default">
                    Enviar Instrucciones
                </button>

            </form>

            <nav className="lg:flex lg:justify-between">
                <Link   to="/"
                        className="block text-center my-5 text-sm">
                    ¿Ya tienes una cuenta? <span className="text-[#2e69fe]"> Inicia sesión </span>
                </Link>

                <Link   to="/signup"
                        className="block text-center my-5 text-sm">
                    ¿No tienes una cuenta? <span className="text-[#2e69fe]"> Regístrate </span>
                </Link>
            </nav>
        </>
    )
}