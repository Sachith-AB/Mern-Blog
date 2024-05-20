import React from 'react'
import { TextInput,Button } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreateAdd() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl font-semibold'>
        Create a Add
      </h1>
      <form action="" form className="flex flex-col gap-4">
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <TextInput type='text' placeholder='Title' required id='title'
          className='flex-1'/>
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
    </div>
  )
}
