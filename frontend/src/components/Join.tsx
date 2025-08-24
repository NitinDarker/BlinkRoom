import { useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { joinSocket, setUsername as setGlobalUsername } from '../socket'
import { useNavigate } from 'react-router'

const Join = () => {
  const navigate = useNavigate()
  const usernameRef = useRef<HTMLInputElement>(null)
  const [roomId, setRoomId] = useState('')
  const [username, setUsername] = useState('')

  const handleJoin = () => {
    if (!roomId) return toast.error('Room ID is required')
    if (!username) return toast.error('Username is required')
    setGlobalUsername(username)
    joinSocket(roomId, username, navigate)
  }

  return (
    <form
      className='flex flex-col items-center justify-center gap-4'
      onSubmit={e => {
        e.preventDefault() // stop form reload
        handleJoin()
      }}
    >
      <Toaster />
      <h1 className='font-doto text-zinc-300 text-3xl'>Join a Room</h1>
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
        ref={usernameRef}
        placeholder='Username'
        value={username}
        onChange={e => setUsername(e.target.value)}
        className='p-2 border border-zinc-300 rounded-md font-rubik text-zinc-300 max-w-[70%] placeholder:font-doto focus:outline-none'
      />
      <button
        type='submit'
        className='p-1 px-4 border border-zinc-300 rounded-md text-zinc-300 font-doto cursor-pointer hover:bg-zinc-800 hover:scale-105 transition-all focus:outline-none'
      >
        Join
      </button>
    </form>
  )
}

export default Join
