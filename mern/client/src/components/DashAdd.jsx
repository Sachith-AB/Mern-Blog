import React, { useEffect, useState } from 'react'
import { Table,Button,Modal } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {HiOutlineExclamationCircle} from 'react-icons/hi'

export default function DashAdd () {
    const {currentUser}=useSelector((state)=>state.user)
    const [userAdds,setUserAdds]= useState([]);
    const [addIdDelete,setAddIdDelete]=useState('');
    const [showModal,setShowModal]= useState(false);

    
    useEffect(() =>{

        const fetchPosts = async()=>{
            
            try{
                const res = await fetch(`/api/add/getadds?userId=${currentUser._id}`);
                
               
                const data = await res.json()
                
                if(res.ok){
                    
                    setUserAdds(data.adds)
                    if(data.add.length<9){
                        
                    }
                }
            }
            catch(error){
                console.log(error.adds);
            }
        };
        if (currentUser.isAdmin){
            fetchPosts(); 
        }
    },[currentUser._id])

    const handleDeleteAdd = async () =>{
        setShowModal(false);
        try{
            const res = await fetch(`api/add/deleteadd/${addIdDelete}`,
        {
            method:'DELETE',
        })
        const data=await res.json();
        if(!res.ok){
            console.log(data.message)
        }
        else{
           setUserAdds((prev)=>
           prev.filter((add)=> add._id !==addIdDelete));
        }
            
        }
        catch(error){
            console.log(error.message)
        }
    }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
    scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
    dark:scrollbar-thumb-slate-500'>
       {currentUser.isAdmin  && userAdds.length ?(
        <>
            <Table>
                <Table.Head>
                    <Table.HeadCell>Date updated</Table.HeadCell>
                    <Table.HeadCell>Post image</Table.HeadCell>
                    <Table.HeadCell>Post title</Table.HeadCell>
                    <Table.HeadCell>category</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                    <Table.HeadCell>
                        <span>Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                {userAdds.map((add)=>(
                    <Table.Body className='divide-y' >
                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <Table.Cell>{new Date(add.updatedAt).toLocaleDateString()}</Table.Cell>
                            <Table.Cell>
                                <img src={add.image}
                                alt={add.title}
                                className='w-20 h-10 bg-gray-500'/>
                            </Table.Cell>
                            <Table.Cell>
                                <Link className='font-medium text-gray-900 dark:text-white' to ={`/add/${add.slug}`}>
                                    {add.title}
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                {add.category}
                            </Table.Cell>
                            <Table.Cell>
                                <span onClick={()=>{
                                    setShowModal(true)
                                    setAddIdDelete(add._id)
                                    console.log(add._id)
                                }} className='font-medium text-red-500 hover:underline cursor-pointer'>
                                    Delete
                                </span>
                            </Table.Cell>
                            <Table.Cell>
                                <Link  to={`/update-add/${add._id}`}>
                                <span className='text-teal-500 hover:underline cursor-pointer'>
                                    Edit
                                </span>
                                </Link>
                            </Table.Cell>

                        </Table.Row>
                    </Table.Body>
                ))}
        </Table>
        </>
     ):(
        <p>You have no add!</p>
    )}
        <Modal show = {showModal} onClose={() => setShowModal(false)} popupsize='md'>
            <Modal.Header/>
            <Modal.Body>
                <div className='text-center'>
                    <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400
                    dark:text-gray-200 mb-4 mx-auto'/>
                    <h3 className='mb-5 text-gray-500 text-lg'>
                        Are you sure you want to delete this post?
                    </h3>
                    <div className='flex justify-center gap-4'>
                         <Button color='failure' onClick={handleDeleteAdd}>
                            Yes, I'm sure
                        </Button>
                        <Button 
                        color = 'gray' onClick={() => setShowModal(false)}>
                            No, cancel 

                        </Button>
                    </div>
                   </div>

            </Modal.Body>
        </Modal>

    </div>
  )
}
