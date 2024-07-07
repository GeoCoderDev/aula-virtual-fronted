const WarningMessage = ({
  message,
  className = "",
}: {
  message: string;
  className?: string;
}) => {
  return <div className={`${className}`}>{message}</div>;
};

export default WarningMessage;
