import React, {useContext} from 'react'
import { Navigate, Outlet } from 'react-router-dom'; 
import { AuthContext } from './restricted.js'

export default function Auth(){
    const {sts} = useContext(AuthContext)
    return sts ? <Outlet /> : <Navigate to='/'/>
}