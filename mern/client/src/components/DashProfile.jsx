import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useState,useRef, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {getStorage,ref,uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
    const {currentUser} = useSelector(state=>state.user);
    const [imageFile,setImagefile] = useState(null);
    const [imageFileUrl,setImagefileUrl] = useState(null);
    const [imageFileloadProgress,setImageFileUploadProgress] = useState(null);
    const [ImageFileUploadError,setImageFileUploadError] = useState(null);
    
    const filePickerRef=useRef();
    const handleImageChange =(e)=>{
       const file =e.target.files[0];
       if(file){
        setImagefile(file);
        setImagefileUrl(URL.createObjectURL(file));
       }

    };
    useEffect (()=>{
        if(imageFile){
            uploadImage();
        }
    },[imageFile]);
    const uploadImage = async () =>{
        setImageFileUploadError(null);
       const storage = getStorage(app);
       const fileName = new Date().getTime() + imageFile.name;
       const storageRef = ref(storage,fileName);
       const uploadTask = uploadBytesResumable(storageRef,imageFile);
       uploadTask.on(
        'state_changed',
        (snapshot) =>{
            const progress = 
            (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
            setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) =>{
            setImageFileUploadError('Could not upload image(File must be less than 2MB)');
            setImageFileUploadProgress(null);
            setImagefile(null);
            setImagefileUrl(null);

        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
            setImagefileUrl(downloadURL);
        }
        )
        }
       )


    }
   
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>
            profile
        </h1>
        <form className='flex flex-col gap-4'>
            <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
            <div className='relative w-32 h-32 self-center cursor-pointer shadow-md' onClick={()=>
            filePickerRef.current.click()}>
                {imageFileloadProgress && (
                    <CircularProgressbar value={imageFileloadProgress || 0} text={`${imageFileloadProgress}%`}
                    strokeWidth={5}
                    styles={{
                        root:{
                            width:'100%',
                            height:'100%',
                            position:'absolute',
                            top:0,
                            left:0,

                        },
                        path:{
                             stroke: `rgba(62, 152, 199, ${imageFileloadProgress / 100
                  })`,
                        }
                    }}
                    />
                )}

            <img src={imageFileUrl||currentUser.profilePicture} alt='user' className={`rounded-full
           w-full h-full border-8 object-cover border-[lightgray] 
           ${imageFileloadProgress && imageFileloadProgress<100 && 'opacity-60'}`}
            />
            </div>
           {ImageFileUploadError && <Alert color='failure'>
                    {ImageFileUploadError}
            </Alert>}
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
            <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
            <TextInput type='password' id='password' placeholder='password' />
            <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                Update
            </Button>
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
            <span className='cursor-pointer'>
                Delete Account
            </span>
             <span className='cursor-pointer'>
                Sign Out
            </span>
        </div>
    </div>
  )
}
