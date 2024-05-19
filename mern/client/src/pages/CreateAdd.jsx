import React , { useState } from 'react'
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';


export default function CreateAdd() {
  const [formData,setFormData] = useState({});
  const [publishError,setPublishError] = useState(null);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(formData);
    
    try{
      const res = await fetch('/api/add/create',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok){
        setPublishError(data.message);
        return;
      }
     
      if(res.ok){
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    }
    catch(error){
      setPublishError('something went wrong')
    }
  }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
       <h1 className='text-center text-3xl font-semibold'>
        Create a Post
      </h1>

      <form className="flex flex-col gap-4"  onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4  justify-between'>
        <TextInput type='text' placeholder='Title' required id='title'
          className='flex-1'
          onChange={(e) =>{
            setFormData({
              ...formData,title:e.target.value
            })
          }}
          />
          <ReactQuill theme='snow'placeholder='Write something...' className='h-72 mb-12' required
        onChange={(value) =>{
          setFormData({...formData,content:value})
        }}
        />
         <Button type='submit' gradientDuoTone='purpleToPink' >
          Publish
        </Button>
        </div>
      </form>
      {publishError && <Alert color='failure'>{
          publishError
        }</Alert>}
    </div>
  )
}
