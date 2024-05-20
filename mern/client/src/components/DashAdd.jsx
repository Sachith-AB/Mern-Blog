import React, { useEffect, useState } from 'react'
import { Table,Button } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function () {
    const {currentUser}=useSelector((state)=>state.user)
    const [userAdds,setUserAdds]= useState([]);
    useEffect(() =>{

        const fetchPosts = async()=>{
            
            try{
                const res = await fetch(`/api/add/getadds?userId=${currentUser._id}`);
                console.log(res.data);
               
                const data = await res.json()
                console.log(data)
                if(res.ok){
                    //setUserPosts(data.posts || null)
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
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
    scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
    dark:scrollbar-thumb-slate-500'>
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
                                    setPostIdDelete(add._id)
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

    </div>
  )
}
