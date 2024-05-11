import { Sidebar, SidebarItem } from 'flowbite-react'
import React from 'react'
import {HiAnnotation, HiArrowSmRight, HiDocument, HiDocumentText, HiOutlineUserGroup, HiUser} from 'react-icons/hi'
import { useEffect,useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { signOutSucess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'


export default function DashSidebar() {
  const location = useLocation()
  const dispatch=useDispatch();
  const {currentUser}=useSelector(state=>state.user);
  const [tab,setTab] = useState('')
        useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
   if (tabFromUrl){
    setTab(tabFromUrl);
   }
  },[location.search])  
  
  const handleSignout = async () =>{
        try{
            const res= await fetch('/api/user/signout',{
                method:'POST'
            })
            const data = await res.json();
            if(!res.ok){
                console.log(data.message)
            }
            else{
                dispatch(signOutSucess())
            }

        }
        catch(error){
            console.log(data.message)
        }
    }
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Link to = '/dashboard?tab=profile'>
              <Sidebar.Item active={tab==='profile'} icon = {HiUser} label = {currentUser.isAdmin? 'Admin': 'User'} labelColor='dark' as='div'>
               profile 
              </Sidebar.Item>
              </Link>
              {currentUser.isAdmin && (
                <Link to = '/dashboard?tab=posts'>
                <Sidebar.Item active = {tab==='posts'} icon={HiDocumentText} as='div'>
                  Posts
                </Sidebar.Item>
                </Link>
              )}
               {currentUser.isAdmin && (
                <>
                <Link to = '/dashboard?tab=comment'>
                <Sidebar.Item active = {tab==='comment'} icon={HiAnnotation} as='div'>
                  Comments
                </Sidebar.Item>
                </Link>
                </>
               
                
              )}

              <Sidebar.Item onClick={handleSignout}  icon = {HiArrowSmRight} className='cursor-pointer'>
               Sign Out
              </Sidebar.Item>

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
