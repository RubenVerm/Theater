import React from 'react'
import { RequireAuth } from 'react-auth-kit'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './components/Web/Home'
import { Login }  from './components/api-authorization/LoginPage'
import SecureComponent from './components/api-authorization/SecureComponent'

const RoutesComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/secure'} element={
                    <RequireAuth loginPath={'/login'}>
                        <SecureComponent />
                    </RequireAuth>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesComponent