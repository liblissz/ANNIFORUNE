import axios from 'axios'
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const NoteDetailpage = () => {
  const [notes, setnote] = useState(null)
  const [loading, setloading] = useState(true)
  const [saving, setsaving] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(()=>{
 const fetchNotes = async ()=>{
try {
  const res = await axios.get(`https://anni-ioh1.onrender.com/api/notes/${id}`)
  setnote(res.data)
} catch (error) {
  toast.error("error fetching the note details") 
  console.log(error);
  
}finally{ 
  setloading(false)
 }
 }

 fetchNotes()
  }, [id])

  if(loading){
    return (
      <div className="min-h-screen bg-base-200 flex 
      items-center justify-center">
        <LoaderIcon className='animate-spin size-10'/>
      </div>
    )
  }
  const handleDelete = async ()=>{
  if(!window.confirm("Are You Sure You Want To delete This Note")){
    return
  }else{
    try {
        await axios.delete(`https://anni-ioh1.onrender.com/api/notes/${id}`)  
     toast.success("Note deleted sucessfull")
     navigate('/')
    } catch (error) {
        toast.error("error deleting note")
        console.log(error );    
    }
  }
}
   const handleSave = async ()=>{
     if(!notes.title.trim() || !notes.content.trim() ){
   toast.error("please enter the title and the content")
   return;
     }
     setsaving(true)
     try {
      await axios.put(`https://anni-ioh1.onrender.com/api/notes/${id}`, notes)
      toast.success("Note Updated sucessfull")
      navigate('/')
    } catch (error) {
      toast.error("error editing note")
      console.log('====================================');
      console.log(error);
      console.log('====================================');
     }finally{
      setsaving(false)
     }
  }

  return (
    <>
    <Navbar/>
    <div className='min-h-screen bg-base-200'>
  <div className="container mx-auto px-4 py-8">
  <div className="max-w-2xl mx-auto">
<div className="flex items-center justify-between mb-6">
  <Link to={"/"} className='btn btn-ghost mb-6'>
<ArrowLeftIcon className='size-5' />
Back to Notes
</Link>
<button onClick={handleDelete} className="btn btn-error btn-outline">
  <Trash2Icon className='h-5 w-5'></Trash2Icon>
  Delete Note
</button>

</div>
<div className="card bg-base-100">
  <div className="card-body">
     <div className="form-control mb-4">
<label className="label">
  <span className="label-text">
    Content 
  </span>
</label>
<input type="text" 
placeholder='Note Content'
className='input input-bordered h-17'
value={notes.title}
onChange={(e) => setnote({...notes, title: e.target.value})}
 />
    </div>
      <div className="form-control mb-4">
<label className="label">
  <span className="label-text">
    Content 
  </span>
</label>
<input type="text" 
placeholder='Note Content'
className='input input-bordered h-24'
value={notes.content}
onChange={(e) => setnote({...notes, content: e.target.value})}
 />
    </div>
     <div className="card-actions justify-end ">
 <button className="btn btn-primary" onClick={handleSave}  disabled={saving}>
 {saving? "saving...." : "Save Changes"}
 </button>
    </div>
     </div>
    
  </div>
</div>

</div>
  </div>

    </>
  )
}

export default NoteDetailpage
