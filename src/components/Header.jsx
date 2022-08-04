import { MdSearch, MdOutlineLogout } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";
import { useProjects } from "../hooks/useProjects";
import { Searcher } from "./Searcher";


export function Header () {

    const { logoutAuth } = useAuth();
    const { handleSearcher, logoutProjects } = useProjects();

    const handleLogout = () => {
        logoutAuth();
        logoutProjects();
        localStorage.removeItem('token');
    }
    
    return (
        <header className="px-4 py-5 bg-white border-b">
            <div className="md:flex md:justify-between">
                <h2 className="text-2xl text-center font-black text-[#d9376e] mb-5 md:mb-0"> TaskManager </h2>

                <div className="flex flex-col md:flex-row items-center gap-4">

                    <button type="button"
                            className="font-bold uppercase bg-blue-600 text-white px-3 rounded-full"
                            onClick={ handleSearcher }
                    >
                        Buscar proyecto <span className="inline-block"> <MdSearch/> </span>
                    </button>


                    <button type="button"
                            className="text-sm text-red-500 p-3 uppercase flex items-center gap-1"
                            onClick={ handleLogout }
                    >
                        Cerrar sesión <span className="inline-block"> <MdOutlineLogout/> </span>
                    </button>

                    <Searcher/>
                </div>

            </div>
        </header>
    )
}