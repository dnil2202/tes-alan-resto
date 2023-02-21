import axios from 'axios';
import React, { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { API_URL } from '../helper';
import { ToastContainer, toast } from 'react-toastify';


const ModalInput = ({setOpenModal, setFetchStatus})=> {

    const [inputName, setInputName]=useState('')
    const [inputPrice, setInputPrice]=useState('')
    const [inputImg, setInputImg]=useState('')

    const onSumbit =  () =>{
        let formData = new FormData()
            formData.append('data', JSON.stringify({
                name:inputName,
                price:inputPrice
            }))
            formData.append('img',inputImg)
            console.log(formData)
            axios.post(API_URL+'/menu',formData)
            .then((res)=>{
                setOpenModal(false)
                setFetchStatus(true)
                toast.success('Data Tersimpan',{
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
            })
    

    }

  return (
    <div className='py-4'>
        <b className='bg-sky-400 text-white px-2 py-1'>Tambahkan Menu</b>
        <div className='mt-3'>
            <label className='block mb-3'>
                <span className='block text-sm'>Nama Menu</span>
                <input className='border border-slate-200 w-full mt-2' onChange={(e)=>setInputName(e.target.value)}/>
            </label>
            <label className='block mb-3'>
                <span className='block text-sm'>Image</span>
                {
                    !inputImg ?
                    <>
                <div className='border border-slate-200 bg-slate-200 w-full mt-2 h-40'>
                    <div className='flex justify-center mt-14'>
                        <AiOutlineCloudUpload size={30} className='fill-slate-500'/>
                    </div>
                    <p className='text-center'>Select Picture</p>
                <input type='file' style={{display:'none'}} className='border border-slate-200 w-full mt-2 h-40' onChange={(e)=>setInputImg(e.target.files[0])}/>
                </div>
                    </>
                    :
                    <>
                    <img src={URL.createObjectURL(inputImg)} className='w-52'/>
                    </>
                }
            </label>
            <label className='block mb-3'>
                <span className='block text-sm'>Harga</span>
                <div className='relative'>
                    <input className='border border-slate-200 w-full mt-2 pl-9' onChange={(e)=>setInputPrice(e.target.value)}/>
                    <span className='absolute left-0 bg-sky-400 bottom-0 h-[25px] px-2 text-white' >Rp.</span>
                </div>
            </label>
            <div className='flex justify-end mt-10 gap-3'>
                <button className='bg-red-600 text-white px-4 py-1' onClick={()=>setOpenModal(false)}>Cancel</button>
                <button className='bg-teal-600 text-white px-4 py-1' onClick={onSumbit}>Simpan</button>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default ModalInput