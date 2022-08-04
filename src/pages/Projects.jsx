import { useProjects } from "../hooks/useProjects";
import { ProjectPreview } from "../components/ProjectPreview";
import { Alert } from "../components/Alert";
import { useEffect } from "react";

export function Projects () {

    const { projects, alert } = useProjects();

    const { message } = alert;

    return (
        <>
            <h1 className="text-3xl font-light"> Proyectos </h1>

            {
                message && <Alert alert={ alert }/>
            }

            <div>
                { projects.length 
                    ? projects.map( project => (
                        <div className="bg-white drop-shadow-lg mt-5 rounded-lg" key={ project._id } >
                            <ProjectPreview 
                                key={ project._id } 
                                project={ project }
                            />
                        </div>
                    ))
                    : (
                        <p className="text-center uppercase p-5"> Aún no tienes proyectos, empieza creando uno </p>    
                    ) 
                }
            </div>
        </>
    )
}