import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 
        justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='justify-center flex flex-col'>
            <h2>
                Want  to learn about JavaScript?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these resources with 100 JavaScriot projects
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href='https://www.100jsprojects.com' target='_blank' rel='noonper noreferrer'>
                    100 JavaScripts Projects
                </a>
            </Button>
        </div>
        <div className='p-7 '>
            <img src='https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?' />
        </div>
    </div>
  )
}
