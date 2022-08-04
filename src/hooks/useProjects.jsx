import { useContext } from "react";
import ProjectsContext from "../context/ProjectsProvider";


export function useProjects () {
    return useContext( ProjectsContext );
}