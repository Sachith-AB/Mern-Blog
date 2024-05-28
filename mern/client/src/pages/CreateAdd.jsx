<<<<<<< HEAD
import React, { useState } from 'react'
import { TextInput,Button, Alert,FileInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import {getDownloadURL, getStorage, uploadBytesResumable,ref} from 'firebase/storage'
import {app} from '../firebase'
import   {CircularProgressbar} from 'react-circular-progressbar';

export default function CreateAdd() {
  const [formData,setFormData]=useState({});
  const [PublishError,setPublishError]=useState(null);
  const navigate=useNavigate();
  const [file,setFile] = useState(null);
  const [imageUploadProgress,setImageUploadProgress] = useState(null);
  const [imageUploadProgressFailure,setImageUploadFailure] = useState(null);
  
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
=======
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
>>>>>>> d2c6f2f79b7fa69cc9136d1260fc91ab80838533
      if(!res.ok){
        setPublishError(data.message);
        return;
      }
<<<<<<< HEAD
      if(res.ok){
        setPublishError(null);
        navigate(`/add/${data.slug}`);
      }
    }
    catch(error){
      console.log('something went wrong');
    }
    
  }

  const handleUploadImage = async()=>{
    try{
      if(!file){
        setImageUploadFailure('Please select an image')
        return ;
      }
      setImageUploadFailure(null);
      const storage=getStorage(app);
      const fileName = new Date().getTime()+'-'+file.name;
      const storageRef = ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef,file);
      uploadTask.on(
        'state_changed',
        (snapshot) =>{
          const progress = 
          (snapshot.bytesTransferred/snapshot.totalBytes) *100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) =>{
          setImageUploadFailure('Image upload fial')
          setImageUploadProgress(null);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
        {
          setImageUploadProgress(null);
          setImageUploadFailure(null);
          setFormData({...formData,image:downloadURL});
        });

      }
      )

    }
    catch(error){
      console.log(error);
      setImageUploadFailure("Image upload Failed")
      setImageUploadProgress(null);
      console.log(error);
    }

  };

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
        <div className='flex gap-4 items-center justify-between border-4
        border-teal-500 border-dotted p-3'
        >
          <FileInput type="file" accept='image/*' onChange={(e) => setFile(e.target.files[0])}/>
          <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>
           {
            imageUploadProgress  ? (<div>
              <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress||0}%`}/>
            </div>):('Upload image')
           }
          </Button>
        </div>
        {imageUploadProgressFailure &&(
          <Alert color='failure'>
            {imageUploadProgressFailure}
          </Alert>
        )}
        {formData.image && (
          <img
          src={formData.image}
          alt='upload'
          className='w-full h-72 object-cover'
          />
        )} 

        <ReactQuill theme='snow'placeholder='Write something...' className='h-72 mb-12' required
=======
     
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
>>>>>>> d2c6f2f79b7fa69cc9136d1260fc91ab80838533
        onChange={(value) =>{
          setFormData({...formData,content:value})
        }}
        />
<<<<<<< HEAD
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
=======
         <Button type='submit' gradientDuoTone='purpleToPink' >
          Publish
        </Button>
        </div>
      </form>
      {publishError && <Alert color='failure'>{
          publishError
        }</Alert>}
>>>>>>> d2c6f2f79b7fa69cc9136d1260fc91ab80838533
    </div>
  )
}
