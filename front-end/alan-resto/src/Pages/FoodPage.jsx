import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../helper'
import ModalInput from '../Component/ModalInput'
import { ToastContainer, toast } from 'react-toastify'

const FoodPage = () => {
    const [dataFood, setDataFood]=useState([])
    const [openModal, setOpenModal]=useState(false)
    const [fetchStatus, setFetchStatus]= useState(false)




    const getDataFood = async () =>{
        try {
            let res = await axios.get(API_URL+'/menu')
            setDataFood(res.data)
            setFetchStatus(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getDataFood()
    },[fetchStatus])

    const deleteFood = (id) =>{
        axios.delete(API_URL+`/menu/${id}`)
        .then((res)=>{
            setFetchStatus(true)
            toast.success('Delete Sukses',{
                theme: "colored",
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            })
        })
        .catch((err)=>{
            console.log(err)
            toast.error('Delete Gagal',{
                theme: "colored",
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            })
        })
    };

    const printDataFood = () =>{
        return dataFood.map((v,i)=>{
            return(
                    <tr key={v.id} className={`${i%2 === 0 ?'bg-white':'bg-slate-100'}`}> 
                        <td className='w-10 text-center'>{i+1}</td>
                        <td className='w-3/5'>{v.name}</td>
                        <td><img src={API_URL+v.img} className='w-20'/></td>
                        <td>RP. {Number(v.price).toLocaleString('ID')}</td>
                        <td>
                            <button className='bg-red-600 text-white px-4 py-1'onClick={()=>deleteFood(v.id)}>Delete</button>
                        </td>
                    </tr>
            )
        })
    }




return (
    <div className='pt-3 mx-auto px-20 bg-slate-100 h-screen'>
        <p className='text-base' >Tambahkan menu makanan yang ada di resto</p>
        <div className=' bg-white w-full mt-4 shadow-md px-4'>
            {
                ! openModal ?
                <>
                    <button className='bg-sky-400 text-white px-2 py-1 my-4' onClick={()=>setOpenModal(true)}>Tambahkan Menu</button>
                    <div className='py-5'>
                        <table className='w-full bg-slate-100'>
                            <thead>
                            <tr className='h-12'>
                                <th>#</th>
                                <th className='text-start'>Nama</th>
                                <th className='text-start'>Foto</th>
                                <th className='text-start'>Harga</th>
                                <th className='text-start'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='w-full'>
                            {printDataFood()}
                        </tbody>
                        </table>
                    </div>
                </>
                :
                <ModalInput setOpenModal={setOpenModal} setFetchStatus={setFetchStatus}/>
            }
        </div>
        <ToastContainer/>        
    </div>
)
}

export default FoodPage