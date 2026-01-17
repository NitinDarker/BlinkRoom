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
      <div className='min-h-screen flex items-center justify-center relative bg-black p-4'>
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
