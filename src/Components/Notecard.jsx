import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { formDate } from '../lib/util'
import axios from 'axios'
import toast from 'react-hot-toast'

const Notecard =  ({note, setNotes}) => {
    const handleDelete = async (e, id)=>{
  e.preventDefault()
  if(!window.confirm("Are You Sure You Want To delete This Note")){
    return
  }else{
    try {
        await axios.delete(`https://anni-ioh1.onrender.com/api/notes/${id}`)
        setNotes((prev) => prev.filter(note => note._id !== id))
     toast.success("Note deleted sucessfull")
    } catch (error) {
        toast.error("error deleting note")
        console.log(error );
        
    }
  }
    }
  return (
    <Link to={`/notes/${note._id}`}
    className='card bg-base-100 hover:shadow-lg transition-all
    duration-200 border-t-4 border-solid border-[#00FF90]'>
        
        <div className='card-body'>
 <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
        <div className="card-actions justify-between items-center mt-4 ">
            <span className='text-sm text-base-content/60'>
                {formDate(new Date (note.createdAt))}
            </span>
            <div className="flex items-center gap-1">
           <PenSquareIcon className='size-4'/>
           <button onClick={(e) => handleDelete(e, note._id)} className='btn btn-ghost btn-x5 text-error'>
            <Trash2Icon className='size-4'/>
           </button>
            </div>
        </div>
        </div>

        </Link>
  )
}

export default Notecard
