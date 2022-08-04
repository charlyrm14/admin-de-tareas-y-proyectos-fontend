import { formatDate } from "../helpers/formatDate";
import { MdOutlineModeEdit, MdOutlineDelete } from "react-icons/md";
import { useProjects } from "../hooks/useProjects";
import { useAdmin } from "../hooks/useAdmin";


export function Task ( { task } ) {
    
    const { _id, name, description, status, deliveryDate, priority } = task;

    const { handleTaskEdit, handleModalDeleteTask, completeTask } = useProjects();

    const admin = useAdmin();


    return (
        <div className="p-5 flex justify-between items-center">

            <div>
                <p className="text-xl mb-1"> { name } </p>
                <p className="text-sm text-[#d9376e] uppercase mb-1"> { description } </p>
                <p className="text-base text-gray-500 mb-1 capitalize"> { formatDate(deliveryDate) } </p>
                <p className="text-base text-gray-500 mb-1"> Prioridad: { priority } </p>
                {
                    status && 
                        <p className="text-base text-[#2cb67d]"> Completada por: { task.completed.name } </p>
                }
            </div>

            <div className="flex flex-col lg:flex-row gap-3">


                <button className={` ${ status ? 'bg-[#2cb67d] text-white' : 'bg-gray-300 text-white' } py-1 px-2 uppercase text-sm rounded-full cursor-default`}
                            onClick={ () => completeTask( _id ) } >
                        { status ? 'Completada' : 'Incompleta'} 
                </button>

                {
                    admin && (
                        <button className="py-1 px-2 uppercase text-sm rounded-full cursor-default border border-   [#ff8e3c] hover:bg-[#ff8e3c] hover:text-white"
                        onClick={ () => handleTaskEdit( task ) }>
                            Editar <span className="inline-block"> <MdOutlineModeEdit/> </span>
                        </button>
                    )
                }  

                
                {
                    admin && (
                        <button className="py-1 px-2 uppercase text-sm rounded-full border border-red-600 hover:bg-red-600 hover:text-white cursor-default"
                                onClick={ () => handleModalDeleteTask( task ) }
                        >
                            Eliminar <span className="inline-block"> <MdOutlineDelete/> </span>
                        </button>
                    )
                }
                
            </div>

        </div>
    )
}