import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const path = useLocation()
    const navigate = useNavigate()
  return (
    <div>
        <div className='w-full bg-sky-400 py-2 px-20'>
            <p className='text-xl text-white'>Dadan Resto</p>
        </div>
        <div className='w-full bg-white shadow-xl px-20 flex h-12'>
            <button className={`${path.pathname === '/food' && 'border-b-2 border-sky-400'} w-24`} onClick={()=>navigate('/food')}>Food</button>
            <button className={`${path.pathname === '/' && 'border-b-2 border-sky-400'} w-24`} onClick={()=>navigate('/')}>Transaction</button>

        </div>
    </div>
  )
}

export default Navbar