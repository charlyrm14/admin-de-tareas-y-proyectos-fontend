import { useAuth } from "./useAuth";
import { useProjects } from "./useProjects";

export function useAdmin () {

    const { project }   = useProjects();
    const { auth }      = useAuth();

    return project.creator === auth._id;
}