import { MdOutlineDelete } from "react-icons/md";
import { useProjects } from "../hooks/useProjects";

export function Collaborator ( { collaborator } ) {

    const { handleModalDeleteCollaborator } = useProjects();
    
    const { name, email } = collaborator;

    return (
        <div className="flex justify-between p-5 items-center">
            <div>
                <p className="text-xl mb-1"> { name } </p>
                <p className="text-sm text-[#d9376e] mb-1"> { email } </p>
            </div>

            <div>
                <button type="button"
                        className="py-1 px-2 uppercase text-sm rounded-full border border-red-600 hover:bg-red-600 hover:text-white cursor-default"
                        onClick={ () => handleModalDeleteCollaborator( collaborator ) }
                >
                    Eliminar de proyecto <span className="inline-block"> <MdOutlineDelete/> </span>
                </button>
            </div>

        </div>
    )
}