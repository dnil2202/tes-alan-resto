import axios from 'axios'
import React, { useEffect, useState, useRef} from 'react'
import { API_URL } from '../helper'
import ReactToPrint from 'react-to-print'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const TransactionPage = () => {

  const componentRef = useRef()
  const saveBill = () => toast.success('Bill Tersimpan',{
    theme: "colored",
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  })

  const [dataFood, setDataFood] = useState([])
  const [dataCart, setDataCart] = useState([])
  const [openModal,setOpenModal]=useState(false)
  const [inputPayment,setInputPayment]=useState(0)

  const getDataFood = async () =>{
    try {
        let res = await axios.get(API_URL+'/menu')
        setDataFood(res.data)
    } catch (error) {
        console.log(error)
    }
}

useEffect(()=>{
    getDataFood()
},[]);

const addToCart = (id) =>{
  let selectedFood = dataFood.filter(v=>v.id === id)
  let newData = selectedFood.map((v,i)=>{
    return {...v, qty:1}
  })
  let tempData = [...dataCart]
  let idx = dataCart.findIndex(v=>v.id===id)
  if(!tempData[idx]){
    setDataCart([...dataCart,...newData])
  }else{
    let dataAddQty = {
      ...tempData[idx]
    }
    dataAddQty.qty+=1
    tempData.splice(idx,1,dataAddQty)
    setDataCart(tempData)
  };
};




const printDataFood = () => {
  return dataFood.map((v,i)=>{
    return (
      <div key={v.id} className='w-60 bg-white h-60 my-2 shadow-md'>
        <div onClick={()=>addToCart(v.id)}>
          <img src={API_URL+v.img} className='w-full h-44'/>
          <div className='text-center'>
            <p>{v.name}</p>
            <p className='text-sky-400'>RP. {Number(v.price).toLocaleString('ID')}</p>
          </div>
        </div>

      </div>
    )
  });
};

const prinDataCart = () => {
  if(dataCart.length>0){
    return dataCart.map((v,i)=>{
      return (
        <div key={v.id} className='flex justify-between px-2 mt-2'>
          <img src={API_URL+v.img} className='w-32'/>
          <p className='text-sm mt-5'>{v.name}</p>
          <div className='flex mt-5 gap-3'>
            <p>{v.qty}x</p>
            <p className='text-sky-400'>RP. {Number(v.price*v.qty).toLocaleString('ID')}</p>
          </div>
        </div>
      )
    });
  };
};

const printTransaction = () => {
  return dataCart.map((v,i)=>{
    return (
      <tr key={v.id} className={`${i%2 === 0 ?'bg-white':'bg-slate-100'}`}> 
        <td className='w-10 text-center'>{i+1}</td>
        <td className='w-1/2'>{v.name}</td>
        <td><img src={API_URL+v.img} className='w-20'/></td>
        <td>RP. {Number(v.price*v.qty).toLocaleString('ID')}</td>
      </tr>
    )
  });
};

const totalCart = () =>{
  let total = 0
  dataCart.forEach((v,i)=>{
    total += Number(v.qty*v.price) 
  })
  return total
};


const printTotalCharge = () =>{
      if( totalCart() > Number(inputPayment)){
        return <p className='text-red-300'>Kembalian : Uang Kurang</p>
      }else{
        return <p className='text-green-500'>Kembalian : Rp. {(inputPayment-totalCart()).toLocaleString('id')}</p>
      }
}





  return (
    <div className='pt-3 mx-auto px-20 bg-slate-100'>
      <div className='grid grid-cols-3'>
        <div className='col-span-2 grid grid-cols-3 '>
          {printDataFood()}
        </div>
        <div className=''>
          <div className='mt-2'>
            <p className='text-center'>Pesanan</p>
            <div ref={componentRef}>
              {prinDataCart()}
            </div>
            { dataCart.length >0 &&
            <div className='px-2 my-4'>
              <div className='flex justify-center'>
                <button className='border border-red-600 text-red-600 py-1 hover:bg-red-600 hover:text-white w-full' onClick={()=>setDataCart([])}>Clear Cart</button>
              </div>
              <div className='flex justify-between mt-2 gap-2'>
                <button className='bg-teal-400 text-white w-1/2 py-1 hover:bg-teal-500' onClick={saveBill}>Save Bill</button>
        
                <ReactToPrint
                trigger={()=> <button className='bg-teal-400 text-white w-1/2 py-1 hover:bg-teal-500'>Print Bill</button>}
                content={()=>componentRef.current}
                />
              </div>
              <div className='flex justify-center my-4'>
                <button className='border border-sky-600 text-sky-600 py-1 hover:bg-sky-600 hover:text-white w-full' onClick={()=>setOpenModal(true)}>Charge</button>
              </div>
            </div>
            }
          </div>
        </div>
      </div>
      {
        openModal &&
        <>
          <div className='fixed inset-44 w-1/2 bg-white px-4 py-2'>
            <div>
              <p className='mt-2'>Detail Pesanan</p>
            </div>
            <div className='grid grid-cols-3 gap-3 mt-10'>
                <table className='w-full bg-slate-100 col-span-2 '>
                  <thead>
                    <tr className='h-12'>
                        <th>#</th>
                        <th className='text-start'>Nama</th>
                        <th className='text-start'>Foto</th>
                        <th className='text-start'>Harga</th>
                    </tr>
                  </thead>
                  <tbody className='w-full h-fit'>
                    {printTransaction()}
                  </tbody>
                </table>
                <div className='px-2 border-l-2 '>
                  <p className='text-center'>Uang Kembalian</p>
                  <input className='border border-slate-300 w-full mt-3' onChange={(e)=>setInputPayment(e.target.value)}/>
                  <div className='flex justify-center mt-5 gap-4'>
                    <button className='bg-red-600 text-white px-4 py-1' onClick={()=>setOpenModal(false)}>Close</button>
                    <button className='bg-teal-600 text-white px-4 py-1 disabled:bg-teal-300 disabled:cursor-not-allowed' disabled={totalCart()>inputPayment&&true }>Pay</button>
                  </div>
                  <div className='mt-4'> 
                    <p>Total Belanja : Rp. {totalCart().toLocaleString('id')} </p>
                    <p>{printTotalCharge()}</p>
                  </div>
                </div>
            </div>
          </div>
        </>
      }
      <ToastContainer/>
    </div>
  )
}

export default TransactionPage