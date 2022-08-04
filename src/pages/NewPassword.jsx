import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import { Alert } from "../components/Alert";


export function NewPassword () {

    const [ password, setPassword ]     = useState('');
    const [ validToken, setValidToken ] = useState(false);
    const [ alert, setAlert ]           = useState({});
    const [ updatedPassword, setUpdatedPassword ] = useState(false);

    // Leer token de url
    const params    = useParams();
    const { token } = params;

    useEffect( () => {

        const checkToken = async () => {

            try {

                await axiosClient(`/users/password-reset/${ token }`);
                setValidToken(true);
                
                
            } catch ( error ) {
                setAlert({
                    message: error.response.data.message,
                    error: true,
                });
            }

        }

        // Evita el doble renderizado y evita que se muestre siempre el mensaje de token no valido
        return () => { checkToken() }; 

    }, []);

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        
        if ( password.length < 6) {
            setAlert({
                message: 'La contraseña debe contener al menos 6 caracteres',
                error: true
            });
            return;
        }

        setAlert({});

        try {
            
            const url       = `/users/password-reset/${ token }`;
            const { data }  = await axiosClient.post( url, { password } );

            setAlert({
                message: data.message,
                error: false,
            });

            setUpdatedPassword(true);
            setPassword('');

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
            <h1 className="text-[#0d0d0d] text-4xl uppercase text-center font-bold"> Restablecer contraseña </h1>

            { message && <Alert alert={ alert }/>}

            {
                validToken && (
                    <form   onSubmit={ handleSubmit } 
                            className="mt-3 bg-[#fffffe] shadow rounded-lg px-10 py-5 border-2 border-transparent border-b-[#d9376e]">


                    <div className="my-5">
                        <label className="uppercase block"
                                htmlFor="password"> 
                                Nueva Contraseña 
                        </label>
                        <input
                            id="password" 
                            type="password"
                            name="password"
                            placeholder="Escribe tu nueva contraseña"
                            className="w-full mt-3 p-3 border rounded-lg focus:outline-none"
                            value={ password }
                            onChange={ e => setPassword( e.target.value ) }
                        />
                    </div>


                    <button type="submit"
                            className="bg-[#2e69fe] text-[#fffffe] w-full py-3 my-3 uppercase font-bold rounded-lg cursor-default">
                        Guardar nueva contraseña
                    </button>

                    </form>
                )
            }

                { updatedPassword && (
                    <Link   to="/"
                    className="block text-center my-5 text-base text-[#2e69fe] underline uppercase">
                        Inicia sesión
                    </Link>
                )}
        </>
    )
}