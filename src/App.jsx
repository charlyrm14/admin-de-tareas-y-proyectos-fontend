import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { PasswordReset } from './pages/PasswordReset';
import { NewPassword } from './pages/NewPassword';
import { ConfirmAccount } from './pages/ConfirmAccount';
import { AuthProvider } from './context/AuthProvider';
import { ProtectedRoute } from './layouts/ProtectedRoute';
import { Projects } from './pages/Projects';
import { NewProject } from './pages/NewProject';
import { ProjectsProvider } from './context/ProjectsProvider';
import { Project } from './pages/Project';
import { EditProject } from './pages/EditProject';
import { NewCollaborator } from './pages/NewCollaborator';


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>

            // Rutas públicas
            <Route path='/' element={ <AuthLayout/> }>
              <Route index element={ <Login/> } />
              <Route path='signup' element={ <SignUp/> } />
              <Route path='password-reset' element={ <PasswordReset/> } />
              <Route path='password-reset/:token' element={ <NewPassword/> } />
              <Route path='confirm-account/:token' element={ <ConfirmAccount/> } />
            </Route>

            // Rutas privadas
            <Route path='/projects' element={ <ProtectedRoute/> }>
              <Route index element={ <Projects/> } />
              <Route path='create-project' element={ <NewProject/> } />
              <Route path='new-collaborator/:id' element={ <NewCollaborator/> } />
              <Route path=':id' element={ <Project/> } />
              <Route path='edit-project/:id' element={ <EditProject/> } />
            </Route>

          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
