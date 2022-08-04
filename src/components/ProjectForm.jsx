import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import { Alert } from "./Alert";


export function ProjectForm () {

    const [ id, setId ]                     = useState(null);
    const [ name, setName ]                 = useState('');
    const [ description, setDescription ]   = useState('');
    const [ deliveryDate, setDeliveryDate ] = useState('');
    const [ client, setClient ]             = useState('');

    const params = useParams();

    const { showAlert, alert, projectSubmit, project } = useProjects();

    useEffect( () => {

        if ( params.id ) {
            setId( project._id );
            setName( project.name );
            setDescription( project.description );
            setDeliveryDate( project.deliveryDate?.split('T')[0] );
            setClient( project.client );
        } 

    }, [ params ]);

    const handleSubmit = async ( e ) => {
        e.preventDefault();

        if ( [ name, description, deliveryDate, client ].includes('') ) {
            showAlert({
                message: 'Todos los campos son obligatorios',
                error: true,
            });
            return;
        }

        // Enviar datos a provider
        await projectSubmit({ id, name, description, deliveryDate, client });
        setId(null);
        setName('');
        setDescription('');
        setDeliveryDate('');
        setClient('');
    }

    const { message } = alert;

    
    return (
        <form   onSubmit={ handleSubmit }
                className="bg-white py-10 px-5 rounded-lg drop-shadow-2xl">

            { message && <Alert alert={ alert }/> }

            <div className="mb-5">
                <label  className="uppercase font-bold text-sm"
                        htmlFor="name">
                            Nombre proyecto
                </label>
                <input  type="text"
                        id="name"
                        name="name"
                        className="border w-full p-2 mt-2 rounded-lg focus:outline-none"
                        placeholder="Mi primer proyecto"
                        value={ name }
                        onChange={ e => setName( e.target.value ) }
                />
            </div>

            <div className="mb-5">
                <label  className="uppercase font-bold text-sm"
                        htmlFor="description">
                            Descripción
                </label>
                <textarea   id="description"
                            name="description"
                            className="border w-full p-2 mt-2 rounded-lg focus:outline-none"
                            placeholder="Descripción del proyecto"
                            value={ description }
                            onChange={ e => setDescription( e.target.value ) }
                />
            </div>

            <div className="mb-5">
                <label  className="uppercase font-bold text-sm"
                        htmlFor="date-delivery">
                            Fecha entrega
                </label>
                <input      id="date-delivery"
                            name="date-delivery"
                            type="date"
                            className="border w-full p-2 mt-2 rounded-lg focus:outline-none"
                            placeholder="Descripción del proyecto"
                            value={ deliveryDate }
                            onChange={ e => setDeliveryDate( e.target.value ) }
                />
            </div>

            <div className="mb-5">
                <label  className="uppercase font-bold text-sm"
                        htmlFor="client">
                            Nombre Cliente
                </label>
                <input  type="text"
                        id="client"
                        name="client"
                        className="border w-full p-2 mt-2 rounded-lg focus:outline-none"
                        placeholder="Nombre del cliente"
                        value={ client }
                        onChange={ e => setClient( e.target.value ) }
                />
            </div>

            <button     type="submit"
                        className="bg-[#2e69fe] text-[#fffffe] w-full py-3 my-3 uppercase font-bold rounded-lg cursor-default">
                    { id ? 'Actualizar' : 'Guardar'}
            </button>

        </form>
    )
}