import { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import { Alert } from "./Alert";


export function CollaboratorForm () {

    const [ email, setEmail ]   = useState('');

    const { showAlert, alert, collaboratorSubmit, collaborator } = useProjects();

    const handleSubmit = ( e ) => {
        e.preventDefault();

        if ( email === '' ) {
            showAlert({
                message: 'El correo electrónico es obligatorio',
                error: true
            });
            return;
        }

        showAlert({});
        collaboratorSubmit( email );
    }

    const { message } = alert;
    
    return (
        <>
            <form   className="bg-white py-10 px-5 rounded-lg drop-shadow-2xl"
                    onSubmit={ handleSubmit }        
            >

                { message && <Alert alert={ alert } /> }

                <div className='mb-5'>
                    <label  className='uppercase text-sm font-bold'
                            htmlFor='email'> 
                        Correo electrónico 
                    </label>
                    <input  type='email'
                            id='email'
                            placeholder='Correo electrónico del colaborador'
                            className='border rounded-lg w-full p-2 mt-2 focus:outline-none'
                            value={ email }
                            onChange={ e => setEmail( e.target.value ) }
                    />
                </div>

                <button type="submit"
                        className="bg-[#2e69fe] text-[#fffffe] w-full p-2 rounded-lg uppercase cursor-default font-bold">
                    Buscar colaborador
                </button>

            </form>

        </>
    )
}