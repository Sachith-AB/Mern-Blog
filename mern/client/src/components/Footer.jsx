import { Footer } from "flowbite-react"
import {BsFacebook,BsInstagram,BsTwitter,BsGithub,BsDribbble} from 'react-icons/bs';
import { Link } from "react-router-dom"


export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'
    style={{cursor:'pointer'}}>
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                <div className="mt-5">
                    <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl 
        font-semibold dark:text-white'
        
        >
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500
            to-pink-500 rounded-lg text-white'>
                Sachith's
            </span>
            Blog
        </Link>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 
                sm:gap-6">
                    <div>
                       <Footer.LinkGroup col>
                         <Footer.Title title="About"/>
                    <Footer.Link herf='https://www.100jsproject.com'
                    target="_blank"
                    rel="noopener noreference"
                   
                    >
                        100 JS projects
                    </Footer.Link>

                    <Footer.Link herf='/about'
                    target="_blank"
                    rel="noopener noreference">
                        Sachith's Blog
                    </Footer.Link>
                       </Footer.LinkGroup>
                    </div>
                   <div>
                     
                    <Footer.LinkGroup col>
                        <Footer.Title title="Follow us"/>
                        <Footer.Link herf='https://www.https:github.com/Sachith45'
                    target="_blank"
                    rel="noopener noreference">
                        Github
                    </Footer.Link>

                    <Footer.Link herf='#'
                    >
                        Disord
                    </Footer.Link>
                    </Footer.LinkGroup>
                   </div>
                    <div>
                     
                    <Footer.LinkGroup col>
                        <Footer.Title title="Legal"/>
                        <Footer.Link herf='#'
                    
                    >
                        Privacy Policy
                    </Footer.Link>

                    <Footer.Link herf='#'
                    >
                        Terms &amp; Conditions
                    </Footer.Link>
                    </Footer.LinkGroup>
                   </div>
                </div>
            </div>
            <Footer.Divider/>
            <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright href='#' by ="Sachith's blog" year={new Date().getFullYear()}/>
                <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                    <Footer.Icon href='#' icon={BsFacebook}/>
                    <Footer.Icon href='#' icon={BsInstagram}/>
                    <Footer.Icon href='#' icon={BsTwitter}/>
                    <Footer.Icon href='https://https://github.com/Sachith45' icon={BsGithub}/>
                    <Footer.Icon href='#' icon={BsDribbble}/>
                </div>
            </div>
        </div>
        </Footer>
  )
}
