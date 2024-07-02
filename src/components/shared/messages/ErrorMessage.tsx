const ErrorMessage = ({
  message,
  className = "",
}: {
  message: string;
  className?: string;
}) => {
  return (
    <div
      className={`text-center text-wrap break-words font-bold text-red-500 ${className} animate__animated animate__headShake [animation-duration:800ms]`}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
