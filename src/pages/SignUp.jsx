import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../components/Alert";
import axiosClient from "../config/axiosClient";


export function SignUp () {

    const [ name, setName  ]                        = useState('');
    const [ email, setEmail  ]                      = useState('');
    const [ password, setPassword  ]                = useState('');
    const [ repeatPassword, setRepeatPassword  ]    = useState('');
    const [ alert, setAlert ]                       = useState({});


    const handleSubmit = async ( e ) => {
        e.preventDefault();
        
        if ([ name, email, password, repeatPassword ].includes('') ) {
            setAlert({
                message: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }

        if ( password !== repeatPassword ) {
            setAlert({
                message: 'Las contraseñas no coinciden',
                error: true
            });
            return;
        }

        if ( password.length < 6 ) {
            setAlert({
                message: 'La contraseña debe contener al menos 6 caracteres',
                error: true
            });
            return;
        }
        
        setAlert({});

        // Registrar usuario en API
        try {
            
            const { data } = await axiosClient.post(`/users/signup`, 
                { name, email, password }
            );

            setAlert({
                message: data.message,
                error: false
            });

            setName('');
            setEmail('');
            setPassword('');
            setRepeatPassword('');

            setTimeout(() => {
                setAlert({});
            }, 5000 );

        } catch ( error ) {
            setAlert({
                message: error.response.data.message,
                error: true
            })
        }

    }

    const { message } = alert;

    return (
        <>
        <h1 className="text-[#0d0d0d] text-4xl uppercase text-center font-bold"> Regístrate </h1>
            <p className="text-[#d9376e] font-bold uppercase text-center"> Crea tus proyectos y administralos </p>



            <form   onSubmit={ handleSubmit }
                    className="mt-3 bg-[#fffffe] shadow rounded-lg px-10 py-5 border-2 border-transparent border-b-[#d9376e]">
                
                { message && <Alert alert={ alert }/> }

                <div className="my-5">
                    <label className="uppercase block"
                            htmlFor="name"> 
                                Nombre 
                    </label>
                    <input
                        id="name" 
                        type="text"
                        name="name"
                        placeholder="Tu nombre"
                        className="w-full mt-3 p-3 border rounded-lg focus:outline-none"
                        value={ name }
                        onChange={ e => setName( e.target.value ) }
                    />
                </div>

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

                <div className="my-5">
                    <label className="uppercase block"
                            htmlFor="password2"> 
                            Repetir Contraseña 
                    </label>
                    <input
                        id="password2" 
                        type="password"
                        name="password2"
                        placeholder="Repetir contraseña"
                        className="w-full mt-3 p-3 border rounded-lg focus:outline-none"
                        value={ repeatPassword }
                        onChange={ e => setRepeatPassword( e.target.value ) }
                    />
                </div>

                <button type="submit"
                        className="bg-[#2e69fe] text-[#fffffe] w-full py-3 my-3 uppercase font-bold rounded-lg cursor-default">
                    Regístrarme
                </button>

            </form>

            <nav className="lg:flex lg:justify-between">
                <Link   to="/"
                        className="block text-center my-5 text-sm">
                    ¿Ya tienes una cuenta? <span className="text-[#2e69fe]"> Inicia sesión </span>
                </Link>

                <Link   to="/password-reset"
                        className="block text-center my-5 text-sm">
                    ¿Olvidaste tu contraseña
                </Link>
            </nav>
        </>
    )
}