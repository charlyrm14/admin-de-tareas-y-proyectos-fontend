import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CollaboratorForm } from "../components/CollaboratorForm";
import { useProjects } from "../hooks/useProjects";
import { MdOutlinePersonOutline } from "react-icons/md";
import { Alert } from "../components/Alert";


export function NewCollaborator () {

    const { getProject, project, loading, collaborator, addCollaborator, alert }    = useProjects();
    const params            = useParams();

    useEffect( () => {
        getProject( params.id );
    }, []);

    if ( !project?._id ) return <Alert alert={ alert }/>
    
    return(
        <>
            <h1 className="text-3xl font-light mt-10 mb-3"> 
                Añadir Colaborador(a) a proyecto: <span className="font-bold"> { project.name }  </span>
            </h1>

            <div className='lg:grid lg:grid-cols-3 lg:gap-4'>

                <div className="col-start-1 col-end-3 mt-10">
                    <CollaboratorForm/>
                </div>

                <div className="col-start-3 col-end-4 mt-10">
                    
                </div>

            </div>

            {
                loading ? <p className="text-center"> Cargando ... </p> : collaborator?._id && (

                    <div className='lg:grid lg:grid-cols-3 lg:gap-4'>

                        <div className="col-start-1 col-end-3">
                            <div className="bg-white rounded-lg drop-shadow-2xl">
                                <h2 className="text-center my-10 py-10 text-2xl uppercase"> 
                                    Resultado de busqueda 
                                </h2>
                                <div className="flex justify-between items-center p-5">
                                    <p className="font-bold text-2xl flex items-center gap-2"> 
                                        <span className="inline-block"> <MdOutlinePersonOutline/> </span> { collaborator.name } 
                                    </p>

                                    <button type="button"
                                            className="rounded-full uppercase text-sm border-2 border-[#d9376e] p-2 hover:bg-[#d9376e] hover:text-white cursor-default"
                                            onClick={ () => addCollaborator({ email: collaborator.email }) }
                                    > 
                                        Agregar al proyecto 
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-start-3 col-end-4 mt-10">
                            
                        </div>

                    </div>
                )
            }

        </>
    )
    
}