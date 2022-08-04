import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useProjects } from "../hooks/useProjects"
import { MdOutlineCancelPresentation, MdOutlineWarning } from "react-icons/md";


export function ModalDeleteTask () {

    const { modalDeleteTask, handleModalDeleteTask, taskDelete } = useProjects();
    
    return (
        <Transition.Root show={ modalDeleteTask  } as={ Fragment }>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" 
            onClose={ handleModalDeleteTask }>
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
                        as={ Fragment }
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
                                    onClick={ handleModalDeleteTask }
                                >
                                    <MdOutlineCancelPresentation/>
                                </button>
                            </div>
 
 
                            <div className="sm:flex sm:items-start mb-10">

                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 text-red-600">
                                    <MdOutlineWarning/>
                                </div>

                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        Eliminar Tarea
                                    </Dialog.Title>

                                    <div className='mt-10'>
                                        <p className='text-lg text-center text-gray-700'>
                                            ¿ Estas seguro de eliminar esta tarea ? 
                                            <span className='block'> Una tarea eliminada no se podra recuperar  </span>
                                        </p>
                                    </div>
 
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={ taskDelete }
                                >
                                    Eliminar
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={ handleModalDeleteTask }
                                > 
                                    Cancelar
                                </button>
                            </div>

                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}