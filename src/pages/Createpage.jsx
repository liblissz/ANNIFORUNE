import { ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import toast from 'react-hot-toast'
import axios from 'axios'

const Createpage = () => {
  const [title, settitle] = useState("")
  const [content, setcontent] = useState("")
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      toast.error("all field required")
      return
    }
    setloading(true)
    try {
      await axios.post('https://anni-ioh1.onrender.com/api/notes',
        {
          title,
          content
        }
      )
      toast.success("notes created successfully")
      navigate('/')
    } catch (error) {
      console.log(error);
      if (error.response.status === 429) {
        toast.error("slow down you are creating notes too fast", {
          duration: 4000,
          icon: '☠'
        })
      } else {
        toast.error('failed to create notes! please try again later ')
      }
    } finally {
      setloading(false)
    }
  }
  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-base-200 '>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Link to={"/"} className='btn btn-ghost mb-6'>
              <ArrowLeftIcon className='size-5' />
              Back to Notes
            </Link>
            <div className="card bg-base-100">
              <div className="card-body">
                <h2 className='card-title text-2xl mb-4'>
                  create New Notes
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">
                        Title
                      </span>
                    </label>
                    <input type="text"
                      placeholder='Note Title'
                      className='input input-bordered'
                      value={title}
                      onChange={(e) => settitle(e.target.value)} />
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
                      value={content}
                      onChange={(e) => setcontent(e.target.value)} />
                  </div>
                  <div className="card-actions justify-end ">
                    <button className="btn btn-primary" type='submit' disabled={loading}>
                      {loading ? "creating...." : "Create Notes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Createpage
