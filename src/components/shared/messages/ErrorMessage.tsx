

const ErrorMessage = ({message, className=""}:{message:string, className?:string  }) => {
  return (
    <div className={`text-wrap break-words font-bold text-red-500 ${className}`}>{message}</div>
  )
}

export default ErrorMessage