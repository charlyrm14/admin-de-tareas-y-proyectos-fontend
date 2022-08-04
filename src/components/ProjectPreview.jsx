import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


export function ProjectPreview ( { project} ) {

    const { auth } = useAuth();

    const { _id, name, client, creator } = project;
    
    return(
        <div className='p-5 flex flex-col md:flex-row justify-between items-center'>

            <div>
                <p className="flex-1 text-base"> 
                    { name }
                        <span className="text-sm uppercase text-[#ff8e3c] block"> { client } </span> 
                </p>

                {
                    auth._id !== creator && (
                        <p className='p-2 text-xs rounded-full bg-green-200 font-bold uppercase mt-3'> Colaborador </p>
                    )
                }

            </div>

            <Link   to={`${_id}`}
                    className="m-0 py-1 px-2 bg-blue-500 text-white uppercase text-sm rounded-3xl">
                Ver
            </Link>
        </div>
    )
}