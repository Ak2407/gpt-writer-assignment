type UserMessageProps = {
  message: string;
};

const UserMessage = ({ message }: UserMessageProps) => {
  return (
    <div className="bg-userMsg rounded-lg p-[10px] flex items-center justify-start max-w-[80%]">
      <p className="text-slate-500 text-medium font-[400] tracking-wide">
        {message}
      </p>
    </div>
  );
};

export default UserMessage;
