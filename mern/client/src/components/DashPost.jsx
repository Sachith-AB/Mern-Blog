import {useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { Table,Button } from 'flowbite-react'
import {set} from 'mongoose'
import { Link } from 'react-router-dom'
import { Modal } from 'flowbite-react'
import {HiOutlineExclamationCircle} from 'react-icons/hi'


export default function DashPost() {
    const {currentUser}=useSelector((state)=>state.user)
    const [userPosts,setUserPosts] =useState([])
    const [showMore,setShowMore]=useState(true)
    const [showModal,setShowModal]=useState(false);
    const [postIdDelete,setPostIdDelete] = useState(' ')
    
    
    useEffect(() =>{

        const fetchPosts = async()=>{
            
            try{
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
               
                const data = await res.json()
                //console.log(data)
                if(res.ok){
                    //setUserPosts(data.posts || null)
                    setUserPosts(data.posts)
                    if(data.post.length<9){
                        setShowMore(false);
                    }
                }
            }
            catch(error){
                console.log(error.posts)
            }
        };
        if (currentUser.isAdmin){
            fetchPosts(); 
        }
    },[currentUser._id])
    const handleShowMore= async()=>{
        const startIndex=userPosts.length;
        try{
            const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
            //const data= await res.json();
            console.log(res.data);
            if(res.ok){
                setUserPosts((prev) =>[...prev,...data.posts]);
                if(data.posts.length<9){
                    setShowMore(false);
                }
            }
        }
        catch (error){
            console.log(error.message);
        }
    }
    const handleDeletePost = async () =>{
        setShowModal(false);
        try{
            const res = await fetch(`api/post/deletepost/${postIdDelete}/${currentUser._id}`,
        {
            method:'DELETE',
        })
        const data=await res.json();
        if(!res.ok){
            console.log(data.message)
        }
        else{
           setUserPosts((prev)=>
           prev.filter((post)=> post._id !==postIdDelete));
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
        {currentUser.isAdmin  && userPosts.length ?(
            <>
            <Table hoverable className='shadow-md' >
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
                {userPosts.map((post)=>(
                    <Table.Body className='divide-y' >
                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                            <Table.Cell>
                                <img src={post.image}
                                alt={post.title}
                                className='w-20 h-10 bg-gray-500'/>
                            </Table.Cell>
                            <Table.Cell>
                                <Link className='font-medium text-gray-900 dark:text-white' to ={`/post/${post.slug}`}>
                                    {post.title}
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                {post.category}
                            </Table.Cell>
                            <Table.Cell>
                                <span onClick={()=>{
                                    setShowModal(true)
                                    setPostIdDelete(post._id)
                                }} className='font-medium text-red-500 hover:underline cursor-pointer'>
                                    Delete
                                </span>
                            </Table.Cell>
                            <Table.Cell>
                                <Link  to={`/update-post/${post._id}`}>
                                <span className='text-teal-500 hover:underline cursor-pointer'>
                                    Edit
                                </span>
                                </Link>
                            </Table.Cell>

                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>
            {
                showMore && (
                    <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                        Show more
                    </button>
                )
            }
            </>
        ):(
            <p>You have no post!</p>
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
                         <Button color='failure' onClick={handleDeletePost}>
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
