import { useNavigate } from 'react-router-dom'
import CloseIcon from '../assets/close'
import Create from '../components/Create'
import Join from '../components/Join'
import { useState } from 'react'

function Signup () {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClose = () => {
    navigate('/')
  }

  return (
    <>
      <div className='min-h-screen flex flex-col items-center justify-center relative bg-black p-4'>
        {/* Cold start warning banner */}
        <div className='relative z-10 mb-6 max-w-3xl w-full'>
          <div className='flex items-center gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-amber-200'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className='text-sm font-rubik'>
              <span className='font-semibold'>Note:</span> The server may take up to 30 seconds to wake up on first request. Please be patient.
            </p>
          </div>
        </div>

         <div
          className='absolute inset-0 h-full w-full
          [background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]
          [background-size:20px_20px]
          [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'
        />
        <div className='relative flex w-full max-w-3xl flex-col items-center rounded-xl border-2 border-dashed border-zinc-500 bg-zinc-900/80 backdrop-blur-sm p-8 md:min-h-[400px] md:flex-row md:items-stretch md:p-12'>
          <button
            onClick={handleClose}
            className='absolute top-4 right-4 z-10 cursor-pointer rounded-md border border-transparent text-zinc-400 transition-all hover:text-zinc-200 focus:border-gray-500 focus:outline-none'
          >
            <CloseIcon />
          </button>

          {/* Join section */}
          <div className='flex w-full flex-col items-center justify-center'>
            <Join isLoading={isLoading} setIsLoading={setIsLoading}/>
          </div>

          {/* Divider */}
          <div className='my-8 w-3/4 border-t border-dashed border-gray-400 md:mx-8 md:my-0 md:h-auto md:w-px md:border-l'></div>

          {/* Create section */}
          <div className='flex w-full flex-col items-center justify-center'>
            <Create isLoading={isLoading} setIsLoading={setIsLoading}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
