import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useProjects } from '../hooks/useProjects';
import { MdOutlineCancelPresentation } from "react-icons/md";
import { Alert } from './Alert';
import { useParams } from 'react-router-dom';
import { formatDate } from "../helpers/formatDate";


const PRIORITY = ['Baja', 'Media', 'Alta'];


export function TaskFormModal () {

    const [ id, setId ]                     = useState(null);
    const [ name, setName ]                 = useState('');
    const [ description, setDescription ]   = useState('');
    const [ deliveryDate, setDeliveryDate ] = useState('');
    const [ priority, setPriority ]         = useState('');

    const params = useParams();

    const { taskFormModal, handleTaskModal, showAlert, alert, taskSubmit, task } = useProjects();

    useEffect( () => {
        
        if ( task?._id ) {
            setId( task._id );
            setName( task.name );
            setDescription( task.description );
            setDeliveryDate( task.deliveryDate?.split('T')[0] );
            setPriority( task.priority );
            return;
        }

        setId('');
        setName('');
        setDescription('');
        setDeliveryDate('');
        setPriority('');

    }, [ task ]);

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        
        if ([ name, description, deliveryDate, priority ].includes('')) {
            showAlert({
                message: 'Todos los campos son obligatorios',
                error: true,
            });
            return;
        }

        await taskSubmit({ id, name, description, deliveryDate, priority, project: params.id });

        setId('');
        setName('');
        setDescription('');
        setDeliveryDate('');
        setPriority('');
    }

    const { message } = alert;

    return (
        <Transition.Root show={ taskFormModal } as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={ handleTaskModal }>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white text-gray-500 text-2xl hover:text-red-500"
                                    onClick={ handleTaskModal }
                                >
                                    <MdOutlineCancelPresentation/>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 text-gray-900 uppercase">
                                    { id ? 'Editar Tarea' : 'Nueva Tarea'}
                                    </Dialog.Title>
                                    
                                    <form   className='my-10'
                                            onSubmit={ handleSubmit }
                                    >
                                        { message && <Alert alert={ alert }/>}

                                        <div className='mb-5'>
                                            <label  className='uppercase text-sm font-bold'
                                                    htmlFor='name'> 
                                                Nombre tarea 
                                            </label>
                                            <input  type='text'
                                                    id='name'
                                                    placeholder='Nombre de la tarea'
                                                    className='border rounded-lg w-full p-2 mt-2 focus:outline-none'
                                                    value={ name }
                                                    onChange={ e => setName( e.target.value ) }
                                            />
                                        </div>

                                        <div className='mb-5'>
                                            <label  className='uppercase text-sm font-bold'
                                                    htmlFor='description'> 
                                                Descripción 
                                            </label>
                                            <textarea   id='description'
                                                        placeholder='Descripción de la tarea'
                                                        className='border rounded-lg w-full p-2 mt-2 focus:outline-none'
                                                        value={ description }
                                                        onChange={ e => setDescription( e.target.value ) }
                                            />
                                        </div>

                                        <div className='mb-5'>
                                            <label  className='uppercase text-sm font-bold'
                                                    htmlFor='delivery-date'> 
                                                Fecha de entrega 
                                            </label>
                                            <input  type='date'
                                                    id='delivery-date'
                                                    className='border rounded-lg w-full p-2 mt-2 focus:outline-none'
                                                    value={ deliveryDate }
                                                    onChange={ e => setDeliveryDate( e.target.value ) }
                                            />
                                        </div>

                                        <div className='mb-5'>
                                            <label  className='uppercase text-sm font-bold'
                                                    htmlFor='priority'> 
                                                Prioridad 
                                            </label>
                                            <select     id='priority'
                                                        className='border rounded-lg w-full p-2 mt-2 focus:outline-none'
                                                        value={ priority }
                                                        onChange={ e => setPriority( e.target.value ) }
                                            >
                                                <option value=''> -- Selecciona -- </option>
                                                {
                                                    PRIORITY.map( option => (
                                                        <option key={ option }> { option } </option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <button type='submit'
                                                className='bg-[#2e69fe] text-[#fffffe] w-full p-2 rounded-lg uppercase cursor-default font-bold mt-3'>
                                                { id ? 'Actualizar' : 'Guardar'}
                                        </button>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}