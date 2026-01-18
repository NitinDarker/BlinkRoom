import { useEffect, useRef, useState } from 'react'
import Input from '../components/Input'
import Header from '../components/Header'
import MessageBox from '../components/MessageBox'
import { getRoomId, getSocket, getUsername } from '../socket'
import { useNavigate } from 'react-router-dom'

interface ChatMessage {
  message: string
  author: string
  type: 'chat' | 'server'
}

function Dashboard () {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const socket = getSocket()
  const roomId = getRoomId()
  const username = getUsername()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!socket) {
      console.log('[error] No socket available')
      navigate('/')
      return
    }

    const handleOpen = () => {
      console.log('[socket] WebSocket is open')
      setIsConnected(true)
    }

    const handleClose = () => {
      console.log('[socket] WebSocket closed')
      setIsConnected(false)
    }

    const handleError = (err: Event) => {
      console.log('[error] WebSocket error', err)
      setIsConnected(false)
    }

    const handleMessage = (event: MessageEvent) => {
      // console.log('[message] Received:', event.data)
      const data = JSON.parse(event.data)
      if (data.type === 'chat') {
        setMessages(prev => [
          ...prev,
          {
            message: data.payload.message,
            author: data.payload.author,
            type: 'chat'
          }
        ])
      } else if (data.type === 'server') {
        // console.log('[server] Message:', data.payload.message)
        setMessages(prev => [
          ...prev,
          {
            message: data.payload.message,
            author: 'server',
            type: 'server'
          }
        ])
      }
    }

    socket.addEventListener('open', handleOpen)
    socket.addEventListener('close', handleClose)
    socket.addEventListener('error', handleError)
    socket.addEventListener('message', handleMessage)

    if (socket.readyState === WebSocket.OPEN) {
      setIsConnected(true)
    }

    return () => {
      socket.removeEventListener('open', handleOpen)
      socket.removeEventListener('close', handleClose)
      socket.removeEventListener('error', handleError)
      socket.removeEventListener('message', handleMessage)
    }
  }, [socket, navigate])

  const handleSend = (msg: string) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.log('[error] Socket not ready for sending')
      return
    }
    if (!isConnected) {
      console.log('[error] Socket not connected')
      return
    }
    if (!username) {
      console.log('[error] No username set')
      return
    }
    console.log('[send] Message:', msg)
    socket.send(
      JSON.stringify({
        type: 'chat',
        payload: {
          message: msg
        }
      })
    )
  }

  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-black'>
        <div className='flex flex-col justify-between bg-zinc-900 px-4 pt-4 pb-3 rounded-xl max-w-xl max-h-screen w-full h-160 border-3 border-zinc-500 border-dashed'>
          <div>
            <Header RoomId={roomId} />
            {!isConnected && (
              <div className='text-red-400 text-sm font-doto mb-2'>
                Connecting to server...
              </div>
            )}
          </div>
          <div className='flex-1 scroll-auto mb-4 pb-16 pr-3 overflow-y-auto scrollbar-gutter-stable'>
            <div className='flex flex-col w-full min-h-full'>
              {messages.map((msg, i) =>
                msg.type === 'server' ? (
                  <div
                    key={i}
                    className='text-center text-gray-300 text-sm font-doto my-1'
                  >
                    {msg.message}
                  </div>
                ) : (
                  <MessageBox
                    key={i}
                    message={msg.message}
                    author={msg.author}
                    isMe={msg.author === username}
                  />
                )
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div>
            <Input
              placeholder='message'
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSend}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
