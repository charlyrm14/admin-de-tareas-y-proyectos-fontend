import { ProjectForm } from "../components/ProjectForm"

export function NewProject () {
    
    return(
        <>
            <h1 className="text-3xl font-light"> Nuevo Proyecto </h1>

            <div className='lg:grid lg:grid-cols-3 lg:gap-4'>

                <div className="col-start-1 col-end-3 mt-10">
                    <ProjectForm/>
                </div>

                <div className="col-start-3 col-end-4 mt-10">
                    
                </div>

            </div>

        </>
    )
}