import { useState, useEffect, createContext } from 'react';
import { Alert } from '../components/Alert';
import axiosClient from '../config/axiosClient';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';


let socket;

const ProjectsContext   = createContext();

const ProjectsProvider  = ( { children } ) => {

    const [ projects, setProjects ] = useState([]);
    const [ alert, setAlert ]       = useState({});
    const [ project, setProject ]   = useState({});
    const [ loading, setLoading ]   = useState(false);
    const [ taskFormModal, setTaskFormModal ] = useState(false);
    const [ task, setTask ]         = useState({});
    const [ modalDeleteTask, setModalDeleteTask ]   = useState(false);
    const [ collaborator, setCollaborator ]         = useState({});
    const [ modalDeleteCollaborator, setModalDeleteCollaborator ] = useState(false);
    const [ searcher, setSearcher ] = useState(false);

    const navigate = useNavigate();
    const { auth } = useAuth();

    useEffect( () => {
        const getProjects = async () => {

            try {

                const token = localStorage.getItem('token');
            
                if ( !token ) return;

                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${ token }`
                    }
                }

                const { data } = await axiosClient('/projects', config);
                setProjects( data );
                
            } catch ( error ) {
                console.log( error );
            }

        };

        // Evita el doble renderizado
        return () => { getProjects() }; 

    },[ auth ]);

    useEffect( () => {
        socket = io( import.meta.env.VITE_BACKEND_URL );
    }, []);

    const showAlert = alert => {
        setAlert( alert );

        setTimeout(() => {
            setAlert({});
        }, 4000);
    }

    const projectSubmit = async ( project ) => {

        if ( project.id ) {
            await editProject( project );
        } else {
            await newProject( project );
        }
    
    }

    const newProject = async ( project ) => {
        try {

            const token = localStorage.getItem('token');
            
            if ( !token ) return;

            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${ token }`
                }
            }

            const { data } = await axiosClient.post('/projects', project, config);

            // Sincronizar proyecto que se acaba de crear con los demas proyectos para mostrarlo una vez creado en dicho listado
            setProjects([...projects, data]);
            
            setAlert({
                message: 'Proyecto creado con éxito',
                error: false,
            });

            setTimeout(() => {
                setAlert({});
                navigate('/projects');
            }, 3000);
            
        } catch ( error ) {
            console.log( error );
        }
    }

    const editProject = async ( project ) => {

        try {

            const token = localStorage.getItem('token');
            
            if ( !token ) return;

            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${ token }`
                }
            }

            const { data } = await axiosClient.put(`/projects/${ project.id }`, project, config);

            // Sincronizar con state
            const updatedProjects = projects.map( projectState => projectState._id === data._id ? data : projectState);
            setProjects( updatedProjects );

            setAlert({
                message: 'Proyecto actualizado con éxito',
                error: false,
            });

            setTimeout(() => {
                setAlert({});
                navigate('/projects');
            }, 3000);

        } catch ( error ) {
            console.log( error );
        }
    }

    const getProject = async ( projectID ) => {

        setLoading(true);
        
        try {

            const token = localStorage.getItem('token');
            
            if ( !token ) return;

            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${ token }`
                }
            }

            const { data } = await axiosClient(`/projects/${ projectID }`, config);
            setProject( data );

            setAlert({});

        } catch ( error ) {
            navigate('/projects');
            setAlert({
                message: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, 2000);
        }

        setLoading(false);
    }

    const projectDelete = async ( projectID ) => {
        
        try {

            const token = localStorage.getItem('token');
            
            if ( !token ) return;

            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${ token }`
                }
            }

            const { data } = await axiosClient.delete(`/projects/${ projectID }`, config);

            // Sincronizar con state
            const updatedProjects = projects.filter( projectState => projectState._id !== projectID );
            setProjects( updatedProjects );


            setAlert({
                message: data.msg,
                error: false,
            });

            setTimeout(() => {
                setAlert({});
                navigate('/projects');
            }, 3000);
            
        } catch ( error ) {
            console.log( error );
        }
    }

    const handleTaskModal = () => {
        setTaskFormModal(!taskFormModal);
        setTask({});
    }

    

    const taskSubmit = async ( task ) => {

        if ( task?.id ) {
            await taskEdit( task );
        } else {
            await taskCreate( task );
        }
        
        
    }


    const taskCreate = async ( task ) => {

        try {
            
            const token = localStorage.getItem('token');
            
            if ( !token ) return;

            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${ token }`
                }
            }

            const { data } = await axiosClient.post('/tasks', task, config );

            setAlert({});
            setTaskFormModal(false);

            // socket io
            socket.emit('new task', data );

        } catch ( error ) {
            console.log( error );
        }
    }

    const taskEdit = async ( task ) => {

        try {

            const token = localStorage.getItem('token');
            
            if ( !token ) return;

            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${ token }`
                }
            }

            const { data } = await axiosClient.put(`/tasks/${ task.id }`, task, config);

            
            
            setAlert({});
            setTaskFormModal(false);

            // socket
            socket.emit('update task', data );

            
        } catch ( error ) {
            console.log( error );    
        }

    }

    const handleTaskEdit = ( task ) => {
        setTask( task );
        setTaskFormModal( true );
    }

    const handleModalDeleteTask = ( task ) => {
        setTask( task );
        setModalDeleteTask( !modalDeleteTask );
    }

    const taskDelete = async () => {
        
        try {
            
            const token = localStorage.getItem('token');
            
            if ( !token ) return;

            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${ token }`
                }
            }

            const { data } = await axiosClient.delete(`/tasks/${ task._id }`, config);

            setAlert({
                message: data.msg,
                error: false
            });

            
            setModalDeleteTask(false);

            //socket
            socket.emit('delete task', task);

            setTask({});

            setTimeout(() => {
                setAlert({});
            }, 2000);

        } catch ( error ) {
            console.log( error );    
        }

    }

    const collaboratorSubmit = async ( email ) => {
        
        setLoading(true);
        try {

            const token = localStorage.getItem('token');
            
            if ( !token ) return;

            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${ token }`
                }
            }

            const { data } = await axiosClient.post(`/projects/collaborators`, { email }, config);

            setCollaborator( data );
            setAlert({});
            
        } catch ( error ) {
            setAlert({
                message: error.response.data.msg,
                error: true
            });
        }
        setLoading(false);
    }

    const addCollaborator = async ( email ) => {
        
        try {
            
            const token = localStorage.getItem('token');
            
            if ( !token ) return;

            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${ token }`
                }
            }

            const { data } = await axiosClient.post(`/projects/add-collaborator/${ project._id }`, 
                email, config);

            setAlert({
                message: data.msg,
                error: false,
            });

            setCollaborator({});

            setTimeout(() => {
                setAlert({});
            }, 2000);
            

        } catch ( error ) {
            setAlert({
                message: error.response.data.msg,
                error: true
            });
        }

    }

    const handleModalDeleteCollaborator = ( collaborator ) => {
        setModalDeleteCollaborator(!modalDeleteCollaborator);
        setCollaborator( collaborator );
    }

    const deleteCollaborator = async () => {
        
        try {
            

            const token = localStorage.getItem('token');
            
            if ( !token ) return;

            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${ token }`
                }
            }

            const { data } = await axiosClient.post(`/projects/delete-collaborator/${ project._id }`, { id: collaborator._id }, config );

            const updatedProject = {...project};
            updatedProject.collaborators = updatedProject.collaborators.filter( collaboratorState => collaboratorState._id !== collaborator._id);

            setProject(updatedProject);


            setAlert({
                message: data.msg,
                error: false,
            });

            setCollaborator({});
            setModalDeleteCollaborator(false);

            setTimeout(() => {
                setAlert({});
            }, 2000);


        } catch ( error ) {
            setAlert({
                message: error.response.data.msg,
                error: true
            });
        }
    }

    const completeTask = async ( taskID ) => {
        
        try {

            const token = localStorage.getItem('token');
            
            if ( !token ) return;

            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${ token }`
                }
            }

            const { data } = await axiosClient.post( `/tasks/change-status/${taskID}`, {}, config );
            
            setTask({});
            setAlert({});

            // socket
            socket.emit('change status', data );
            
        } catch ( error ) {
            console.log( error.response );
        }

    }

    const handleSearcher = () => {
        setSearcher(!searcher);
    }

    // Socket io
    const submitTasksProject = ( task ) => {
        const updatedProject = { ...project };
        updatedProject.tasks = [ ...updatedProject.tasks, task];
        setProject( updatedProject );
    }

    const deleteTaskProject = ( task ) => {
        const updatedProject = {...project};
        updatedProject.tasks = updatedProject.tasks.filter( taskState => taskState._id !== task._id  )
        setProject( updatedProject );
    }

    const editTaskProject = ( task ) => {
        const updatedProject = {...project};
        updatedProject.tasks = updatedProject.tasks.map( taskState => taskState._id === task._id ? task: taskState);
        setProject( updatedProject );
    }

    const changeStatusTaskProject = ( task ) => {
        const updatedProject = {...project};
        updatedProject.tasks = updatedProject.tasks.map( taskState => taskState._id === task._id ? task : taskState );

        setProject( updatedProject );
    }

    const logoutProjects = () => {
        setProjects([]);
        setProject({});
        setAlert({});
    }

    return (

        <ProjectsContext.Provider
            value={{
                projects,
                showAlert,
                alert,
                projectSubmit,
                getProject,
                project,
                loading,
                projectDelete,
                taskFormModal,
                handleTaskModal,
                taskSubmit,
                handleTaskEdit,
                task,
                modalDeleteTask,
                handleModalDeleteTask,
                taskDelete,
                collaboratorSubmit,
                collaborator,
                addCollaborator,
                handleModalDeleteCollaborator,
                modalDeleteCollaborator,
                deleteCollaborator,
                completeTask,
                searcher,
                handleSearcher,
                submitTasksProject,
                deleteTaskProject,
                editTaskProject,
                changeStatusTaskProject,
                logoutProjects
            }}
        >
        
            { children }
        </ProjectsContext.Provider>
    )
}

export {
    ProjectsProvider
}

export default ProjectsContext;
