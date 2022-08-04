import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { ProjectForm } from "../components/ProjectForm";
import { useProjects } from "../hooks/useProjects"
import { MdOutlineDelete } from "react-icons/md";


export function EditProject () {

    const params = useParams();

    const { getProject, project, loading, projectDelete } = useProjects();

    useEffect( () => {
        getProject(params.id);
    }, []);

    const handleClickDelete = ( e ) => {
        if ( confirm('¿Estas seguro de eliminar este proyecto?') ) {
            projectDelete( params.id );
        } 
    }

    const { name } = project;

    if ( loading ) return 'Cargando...'; 
    
    return(
        <>
            <h1 className="text-3xl font-light"> 
                Editar <span className="font-bold"> { name } </span> 
            </h1>

            <div className='lg:grid lg:grid-cols-3 lg:gap-4'>

                <div className="col-start-1 col-end-3 mt-10">
                    <ProjectForm/>
                </div>

                <div className="col-start-3 col-end-4 mt-10">
                    <div className="bg-white py-10 px-5 rounded-lg drop-shadow-2xl">
                        
                        <button className="border border-red-600 rounded-full py-1 px-3 uppercase hover:bg-red-600 hover:text-white cursor-default"
                                onClick={ handleClickDelete }>
                                Eliminar <span className="inline-block"> <MdOutlineDelete/> </span>
                        </button>

                    </div>
                </div>

            </div>
        </>
    )
}