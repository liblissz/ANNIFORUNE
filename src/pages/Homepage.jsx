import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import RateLimit from '../Components/RateLimit'
import axios from 'axios'
import toast from 'react-hot-toast'
import Notecard from '../Components/Notecard'
import NotesNotFound from '../Components/NotesNotFound'

const Homepage = () => {
        const [isreatelimit, setisratelimit] = useState(false)
        const [notes, setNotes] = useState([])
        const [loading, setLoading] = useState(true)

        useEffect(()=>{
        const fetchNotes = async ()=>{
            try {
                const res = await axios.get('https://anni-ioh1.onrender.com/api/notes')
                console.log(res.data);
                setNotes(res.data)
                setisratelimit(false)
            } catch (error) {
             console.error("error fetchin notes", error);
             console.log(error);
             
                if(error.response?.status === 429){
                    setisratelimit(true)
                }else{
                    toast.error("failed to get all Notes")
                }
            }finally{
                setLoading(false)
            }
        }
        fetchNotes()
        }, [])
    
  return (
    <div className='min-h-screen'>
        <Navbar/>
      {isreatelimit &&  <RateLimit/>}

<div className="max-w-7xl mx-auto  p-4 mt-6">

{loading && <div className='text-center text-primary py-10'>loading notes.... </div>}
{notes.length === 0 && !isreatelimit && <NotesNotFound/>}
{notes.length > 0 && !isreatelimit && (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {notes.map(note => (
<Notecard key={note._id} note={note} setNotes={setNotes}/>
))}

    </div>
)}
</div>

    </div>
  )
}

export default Homepage
