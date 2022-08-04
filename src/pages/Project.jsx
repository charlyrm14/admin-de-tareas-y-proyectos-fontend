import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import { MdOutlineModeEdit, MdOutlineAddBox, MdOutlinePeopleOutline } from "react-icons/md";
import { TaskFormModal } from "../components/TaskFormModal";
import { Task } from "../components/Task";
import { ModalDeleteTask } from "../components/ModalDeleteTask";
import { Alert } from "../components/Alert";
import { Collaborator } from "../components/Collaborator";
import { ModalDeleteCollaborator } from "../components/ModalDeleteCollaborator";
import { useAdmin } from "../hooks/useAdmin";
import io from 'socket.io-client';

let socket;


export function Project () {

    const params = useParams();

    const { getProject, project, loading, handleTaskModal, alert, submitTasksProject, deleteTaskProject, editTaskProject, changeStatusTaskProject } = useProjects();

    const admin = useAdmin();

    useEffect( () => {
        getProject(params.id);
    }, []);

    // Abre conexión
    useEffect( () => {
        socket = io( import.meta.env.VITE_BACKEND_URL );
        socket.emit('open project', params.id );
    }, []);

    useEffect( () => {
        socket.on('added task', newTask => {
            if ( newTask.project === project._id ) {
                submitTasksProject(newTask); 
            }
        })

        socket.on('deleted task', deletedTask => {
            if (deletedTask.project === project._id ) {
                deleteTaskProject( deletedTask );
            }
        });

        socket.on('updated task', updatedTask => {
            if (updatedTask.project._id === project._id ) {
                editTaskProject( updatedTask );
            }
        })

        socket.on('new status', newStatusTask => {
            if (newStatusTask.project._id === project._id ) {
                changeStatusTaskProject( newStatusTask );
            }
        })
    });

    const { name } = project;

    if ( loading ) return 'Cargando...'; 

    const { message } = alert; 

    return  (

            <>
                <div>
                    <h1 className="text-3xl font-light mb-3"> { name } </h1>

                    {
                        admin && (
                            <Link   to={`/projects/edit-project/${ params.id }`}
                                    className="bg-[#ff8e3c] text-white py-1 px-2 rounded-lg uppercase text-sm hover:bg-orange-600"> 
                                Editar proyecto <span className="inline-block"> <MdOutlineModeEdit/> </span>
                            </Link>
                        )
                    }

                </div>
                

                {
                    admin && (
                        <div className="flex justify-end">
                            <button type="button"
                                    className="w-full md:w-auto px-5 py-1 mt-7 text-center flex items-center gap-1 bg-white text-[#2e69fe] border-4 border-transparent border-r-[#2e69fe] font-bold  drop-shadow-lg hover:bg-slate-100"
                                    onClick={ handleTaskModal }
                                >
                                Nueva tarea <span className="inline-block"> <MdOutlineAddBox/> </span>
                            </button>
                        </div>
                    )
                }
                

                <p className="text-xl mt-10 uppercase"> Tareas del proyecto </p>

                {
                    project.tasks?.length 
                    ? (
                        project.tasks?.map( task => (
                            <div className="bg-white drop-shadow-lg mt-10 rounded-lg" key={task._id}>
                                <Task key={task._id} task={ task }/>
                            </div>
                        ))
                        

                    ) : <p className="text-center my-5 p-10"> Aún no tienes tareas, empieza creando una </p>
                }

                {
                    admin && (

                        <>

                            <p className="text-xl mt-10 uppercase"> Colaboradores </p>

                            <div className="flex justify-end">
                                <Link to={`/projects/new-collaborator/${ project._id }`}
                                        className="w-full md:w-auto px-5 py-1 mt-7 text-center flex items-center gap-1 bg-white text-[#2e69fe] border-4 border-transparent border-r-[#2e69fe] font-bold  drop-shadow-lg hover:bg-slate-100"
                                        onClick={ handleTaskModal }
                                    >
                                    Añadir colaborador <span className="inline-block"> <MdOutlinePeopleOutline/> </span>
                                </Link>
                            </div>


                            {
                                project.collaborators?.length 
                                ? (
                                    project.collaborators?.map( collaborator => (
                                        <div className="bg-white drop-shadow-lg mt-10 rounded-lg" key={collaborator._id}>
                                            <Collaborator key={collaborator._id} collaborator={ collaborator }/>
                                        </div>
                                    ))
                                    

                                ) : <p className="text-center my-5 p-10"> Aún no tienes colaboradores en este proyecto </p>
                            }
                        </>
                    )
                }

                
                <TaskFormModal/>
                <ModalDeleteTask/>
                <ModalDeleteCollaborator/>
            </>
        )

}