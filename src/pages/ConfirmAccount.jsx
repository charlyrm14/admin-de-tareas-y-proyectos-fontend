import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import { Alert } from "../components/Alert";

export function ConfirmAccount () {

    const [ alert, setAlert ] = useState({});
    const [ confirmedAccount, setConfirmedAccount ] = useState(false);

    // Leer token de url
    const params    = useParams();
    const { token } = params;
    
    useEffect( () => {

        const confirmAccount = async () => {

            try {

                const url       = `/users/confirm-account/${ token }`;
                const { data }  = await axiosClient( url );

                setAlert({
                    message: data.message,
                    error: false,
                });

                setConfirmedAccount( true );
                
            } catch ( error ) {
                setAlert({
                    message: error.response.data.message,
                    error: true
                });
            }
        }

        // Evita el doble renderizado y evita que se muestre siempre el mensaje de token no valido
        return () => { confirmAccount() }; 

    }, []);

    const { message } = alert;
    
    return (
        <>
            <h1 className="text-[#0d0d0d] text-4xl uppercase text-center font-bold"> Confirmar cuenta </h1>

            <div className="mt-20 md:mt-5 shadow-lg px-10 py-5 rounded-xl bg-[#fffffe]">
                { message && <Alert alert={ alert }/> }

                { confirmedAccount && (
                    <Link   to="/"
                            className="bg-[#2e69fe] text-[#fffffe] w-full p-3 mt-10 uppercase font-bold rounded-lg block text-center">
                        Inicia sesión
                    </Link>
                )}
            </div>

        </>
    )
}