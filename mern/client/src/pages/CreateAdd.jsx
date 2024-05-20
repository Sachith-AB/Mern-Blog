import React, { useState } from 'react'
import { TextInput,Button, Alert } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

export default function CreateAdd() {
  const [formData,setFormData]=useState({});
  const [PublishError,setPublishError]=useState(null);
  const navigate=useNavigate();
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res= await fetch('/api/add/create',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
        })
      const data =  await res.json();
      if(!res.ok){
        setPublishError(data.message);
        return;
      }
      if(res.ok){
        setPublishError(null);
        navigate(`/add/${data.slug}`);
      }
    }
    catch(error){
      console.log('something went wrong');
    }
    
  }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl font-semibold'>
        Create a Add
      </h1>
      <form action="" form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <TextInput type='text' placeholder='Title' required id='title'
          className='flex-1'
          onChange={(e)=>{
            setFormData({
              formData,title:e.target.value
            })
          }}/>
        </div>
        <ReactQuill theme='snow'placeholder='Write something...' className='h-72 mb-12' required
        onChange={(value) =>{
          setFormData({...formData,content:value})
        }}
        />
        <Button type='submit' gradientDuoTone='purpleToPink' >
          Publish
        </Button>
      </form>
      {PublishError && <Alert color='failure' className='mt-4'>
        {
          PublishError
        }
      </Alert> 
        
      }
    </div>
  )
}
