import { TextInput,Button } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function UpdateAdd() {
    
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl font-semibold'>
        Update a Add
      </h1>
      <form action="" className="flex flex-col gap-4">
        <div className='flex flex-col gap-4  justify-between'>
            <TextInput type='text' placeholder='Title' required id='title' className='flex-1'/>
            <ReactQuill theme='snow'placeholder='Write something...' className='h-72 mb-12' required/>
            <Button type='submit' gradientDuoTone='purpleToPink' >
          Update
        </Button>

        </div>
      </form>
    </div>
  )
}
