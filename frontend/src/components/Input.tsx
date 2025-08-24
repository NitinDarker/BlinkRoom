import { SendIcon } from '../assets/send'

type InputProps = {
  placeholder: string
  value: string
  onChange: (val: string) => void
  onSend: (message: string) => void
}

const Input = ({ placeholder, value, onChange, onSend }: InputProps) => {
  const handleSend = () => {
    if (value.trim()) {
      onSend(value)
      onChange('') // Clear input after sending
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className='sticky bottom-0 flex items-center gap-2 mt-4 position-sticky'>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        rows={1}
        className='p-2 bg-zinc-900 border border-zinc-500 w-full text-zinc-200 rounded-lg font-rubik focus:outline-none placeholder:font-doto resize-none overflow-hidden'
      />
      <button
        onClick={handleSend}
        className='bg-zinc-600 p-2 rounded-lg hover:bg-zinc-500 text-gray-400 hover:text-gray-800 cursor-pointer transition-all'
      >
        <SendIcon />
      </button>
    </div>
  )
}

export default Input
