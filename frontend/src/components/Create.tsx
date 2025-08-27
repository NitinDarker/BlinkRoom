import { useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { createSocket, setUsername as setGlobalUsername } from '../socket'
import { useNavigate } from 'react-router'

const Create = () => {
  const navigate = useNavigate()
  const usernameRef = useRef<HTMLInputElement>(null)
  const [roomId, setRoomId] = useState('')
  const [username, setUsername] = useState('')

  const handleCreate = () => {
    if (!roomId) return toast.error('Room ID is required')
    if (!username) return toast.error('Username is required')
    setGlobalUsername(username)
    createSocket(roomId, username, navigate)
  }

  return (
    <form
      className='flex flex-col items-center justify-center gap-4'
      onSubmit={e => {
        e.preventDefault()
        handleCreate()
      }}
    >
      <Toaster />
      <h1 className='font-doto text-zinc-300 text-3xl'>Create a Room</h1>
      <input
        type='text'
        placeholder='RoomId'
        value={roomId}
        onChange={e => setRoomId(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault()
            usernameRef.current?.focus()
          }
        }}
        className='p-2 border border-zinc-300 rounded-md font-rubik text-zinc-300 max-w-[70%] placeholder:font-doto focus:outline-none'
      />
      <input
        type='text'
        placeholder='Username'
        ref={usernameRef}
        value={username}
        onChange={e => setUsername(e.target.value)}
        className='p-2 border border-zinc-300 rounded-md font-rubik text-zinc-300 max-w-[70%] placeholder:font-doto focus:outline-none'
      />
      <button
        type='submit'
        className='p-1 px-4 border border-zinc-400 rounded-md text-zinc-400 font-doto cursor-pointer transition-all duration-300 hover:border-green-400 hover:text-green-400 hover:scale-105 hover:shadow-[0_0_15px_rgba(74,222,128,0.4)] focus:outline-none focus:border-green-400 focus:text-green-400 focus:shadow-[0_0_15px_rgba(74,222,128,0.4)]'
      >
        Create
      </button>
    </form>
  )
}

export default Create
