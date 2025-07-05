import { NotebookIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const NotesNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16 
    space-y-6 max-w-md mx-auto text-center'>
        <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className='size-10 text-primary'/>
        </div>
        <h3 className='text-2xl font-bold'>No Notes Found</h3>
        <p className="text-base-content/70">
        Ready to organise your thoughts? create your first note to get started on your journey
        </p>
   <Link to={'/create'} className='btn btn-primary'>
   Create your notes
   </Link>
    </div>
  )
}

export default NotesNotFound
