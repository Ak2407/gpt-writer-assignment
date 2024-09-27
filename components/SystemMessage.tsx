type SystemMessageProps = {
  message: string;
};

const SystemMessage = ({ message }: SystemMessageProps) => {
  return (
    <div className="bg-systemMsg rounded-lg p-[10px] flex items-center justify-start max-w-[80%]">
      <p className="text-slate-500 text-medium font-[400] tracking-wide">
        {message}
      </p>
    </div>
  );
};

export default SystemMessage;
