import { Link } from "react-router-dom"
import { MdOutlineAddBox, MdPersonOutline, MdOutlineListAlt } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";


export function Sidebar () {

    const { auth } = useAuth();

    return (
        <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
            <p className="text-md text-center flex items-center gap-2"> 
                <span className="inline-block"> <MdPersonOutline/> </span> Hola, { auth.name } 
            </p>

            <Link   to=''
                    className="w-full p-2 block mt-10 text-center flex items-center gap-1 bg-white text-[#d9376e] border-4 border-transparent border-l-[#d9376e] font-bold  drop-shadow-lg hover:bg-slate-100">
                    <span className="inline-block"> <MdOutlineListAlt/> </span> Proyectos
            </Link>

            <Link   to='create-project'
                    className="w-full p-2 block mt-5 text-center flex items-center gap-1 bg-white text-[#d9376e] border-4 border-transparent border-l-[#d9376e] font-bold  drop-shadow-lg hover:bg-slate-100">
                    <span className="inline-block"> <MdOutlineAddBox/> </span> Nuevo proyecto
            </Link>

        </aside>
    )
}