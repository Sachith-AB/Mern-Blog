import { TextInput,Button,Alert } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useSelector} from 'react-redux'
import { useNavigate,useParams } from 'react-router-dom';

export default function UpdateAdd() {
    const [formData,setFormData]=useState([]);
    const {addId}=useParams();
    const navigate = useNavigate();
    const {currentUser}= useSelector((state)=>state.user);
    const [publishError,setPublishError] = useState(null);

    useEffect(()=>{
     try{
      const fetchAdd=async()=>{
        const res= await fetch(`/api/add/getadds/?addId=${addId}`);
        const data=  await res.json();

        if(!res.ok){
          setPublishError(data.message);
          return;
        }
        if(res.ok && data.adds && data.adds.length > 0){
          setPublishError(null);
          setFormData(data.adds[0]);
          
      }
        
      }
      fetchAdd();
      
     }
     
     catch(error){
      console.log(error);
     }
    },[addId]);

    const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
        const res= await fetch(`/api/add/updateadd/${addId}/${currentUser._id}`,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData),
        });

        const data= await res.json();

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
        setPublishError('something went wrong')
      }
    };


  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl font-semibold'>
        Update a Add
      </h1>
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4  justify-between'>
            <TextInput type='text' placeholder='Title' required id='title' className='flex-1'
            onChange={(e)=>{
              setFormData(
                {
                  ...formData,title:e.target.value
                }
              )
            }}
            value={formData.title}
            />
            <ReactQuill theme='snow'placeholder='Write something...' className='h-72 mb-12' required
             onChange={(value)=>{
              setFormData(
                {
                  ...formData,content:value
                }
              )
            }}
            value={formData.content}
            />
            <Button type='submit' gradientDuoTone='purpleToPink' >
          Update
        </Button>

        {publishError && <Alert color='failure'>{
          publishError
        }</Alert>}

        </div>
      </form>
    </div>
  )
}
