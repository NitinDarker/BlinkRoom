import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/signup')
  }

  const handleMoreInfo = () => {
    window.open('https://github.com/NitinDarker/BlinkRoom', '_blank')
  }

  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4'>
      {/* Grid Background */}
      <div
        className='absolute inset-0 h-full w-full 
        [background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] 
        [background-size:20px_20px]'
      />
      <div
        className='pointer-events-none absolute inset-0 flex items-center justify-center bg-black 
        [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'
      ></div>

      <div>
        {/* Background decorative elements - subtle green glow */}
        <div className='absolute left-1/4 top-1/4 h-32 w-32 animate-pulse rounded-full bg-green-600 opacity-5 blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 h-40 w-40 animate-pulse rounded-full bg-green-800 opacity-5 delay-1000 blur-3xl'></div>
        <div className='absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-green-600 opacity-5 delay-600 blur-2xl'></div>

        <div className='relative z-10 mx-auto max-w-5xl text-center'>
          {/* Main Heading */}
          <h1 className='font-orbitron mb-6 text-5xl font-bold md:text-7xl'>
            <span className='text-8xl text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.5)]'>
              Create your space
            </span>
            <br />
            <span className='text-7xl text-zinc-300'>In a Blink</span>
          </h1>
          {/* Subheading */}
          <p className='font-rubik mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-zinc-500 md:text-2xl opacity-85'>
            Jump into real-time chats with zero setup
            <br />
            Just Blink and you’re in
          </p>
          {/* Feature Indicators */}         
          <div className='mb-12 flex cursor-default items-center justify-center gap-6 text-sm md:text-base'>
            <span className='font-doto font-medium text-zinc-300 transition-all hover:scale-105 hover:text-green-400'>
              Connect
            </span>
            <div className='h-1 w-1 rounded-full bg-zinc-500'></div>           
            <span className='font-doto font-medium text-zinc-300 transition-all hover:scale-105 hover:text-green-400'>
              Collaborate            
            </span>
            <div className='h-1 w-1 rounded-full bg-zinc-500'></div>         
            <span className='font-doto font-medium text-zinc-300 transition-all hover:scale-105 hover:text-green-400'>
              Disappear            
            </span>
          </div>
          {/* Buttons */}         
          <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
               
            <button
              onClick={handleGetStarted}
              className='font-rubik transform cursor-pointer rounded-lg bg-green-500 px-8 py-4 font-semibold text-white shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-all duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-[0_0_30px_rgba(74,222,128,0.5)] focus:outline-none'
            >
              Get Started
            </button>
             
            <button
              onClick={handleMoreInfo}
              className='p-[3px] relative hover:cursor-pointer font-rubik '
            >
              <div className='absolute inset-0 bg-gradient-to-r from-lime-400 to-yellow-400 rounded-lg' />
              <div className='px-8 py-3 bg-black rounded-[6px] relative group transition-all duration-600 text-white hover:bg-transparent hover:text-black hover:scale-105 antialiased'>
                Learn More
              </div>
            </button>
            {/* <button
              onClick={handleMoreInfo}
              className='font-rubik transform cursor-pointer rounded-lg border-2 border-zinc-600 px-8 py-4 font-semibold text-zinc-300 transition-all duration-300 hover:scale-105 hover:border-green-400 hover:text-green-400 focus:outline-none'
            >
              Learn More
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
