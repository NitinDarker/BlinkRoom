type MessageBoxProps = {
  message: string
  author?: string
  isMe: boolean
}

const MessageBox = ({ message, author, isMe }: MessageBoxProps) => {
  return (
    <>
      <div
        className={`max-w-[75%] break-words whitespace-pre-wrap p-3 rounded-lg mb-2 antialiased ${
          isMe
            ? 'bg-green-700 text-white ml-auto'
            : 'bg-blue-700 text-white mr-auto'
        }`}
      >
        <div
          className={`text-xs font-doto ${
            isMe ? 'text-green-200' : 'text-white'
          }`}
        >
          {author}
        </div>
        <div className=''>{message}</div>
      </div>
    </>
  )
}

export default MessageBox
