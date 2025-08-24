import { useNavigate } from 'react-router-dom'
import CloseIcon from '../assets/close'
import Create from '../components/Create'
import Join from '../components/Join'

function Signup () {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate('/')
  }

  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-zinc-950 flex-col'>
        <button
          onClick={handleClose}
          className='absolute top-27 right-97 text-zinc-400 rounded-md cursor-pointer border border-transparent focus:border-gray-500 focus:outline-none transition-all'
        >
          <CloseIcon />
        </button>
        <div className='flex justify-between bg-zinc-900 p-18 py-12 rounded-xl max-w-3xl w-full border-3 border-zinc-500 border-dashed relative'>
          {/* Close icon */}
          <Join />
          <div className='border-l border-dashed border-gray-400 h-80 '></div>
          <Create />
        </div>
      </div>
    </>
  )
}

export default Signup
