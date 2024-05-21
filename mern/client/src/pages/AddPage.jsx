import React, { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react';

export default function AddPage() {

  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(false);
  const [add,setAdd]=useState(null);
  const {addSlug}=useParams();

  useEffect(()=>{
    const fetchPost = async () => {
        try{
            setLoading(true);
            const res= await fetch(`/api/add/getadds?slug=${addSlug}`);
            const data= await res.json();
            
            if(!res.ok){
                setError(true);
                setLoading(false);
                return ;
            }

            if(res.ok){
                setAdd(data.adds[0]);
                setLoading(false);
                setError(false);
            }
        }
        catch(error){
                setError(true);
                setLoading(false)
        }
    }; fetchPost();
},[addSlug]);

if(loading){
  return <div className='flex justify-center items-center min-h-screen'>
      <Spinner size='xl'/>
  </div>
}

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='p-3 text-3xl mt-10 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
      {add && add.title}
        </h1>
        <img src={add && add.image} alt={add&& add.title} className='mt-10 p-3 max-h-[600px] w-full object-cover'/>
        <div className='flex justify-between p-3 border-b border-slale-500 mx-auto w-full max-w-2xl text-xs'>
            <span>
                {add && new Date(add.createdAt).toLocaleDateString()}
            </span>
            <span className='italic'>
                {add&&(add.content.length/1000).toFixed(0)}
                mins read
            </span>

        </div>
        <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html:add && add.content}}></div>
    </main>
  )
}
