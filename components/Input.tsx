type InputProps = {
  onchange: (e: any) => void;
  value: string;
  ref: any;
};

const Input = ({ onchange, value, ref }: InputProps) => {
  return (
    <div>
      <input
        ref={ref}
        type="text"
        className="bg-white rounded-lg w-full border border-gray-300 px-4 py-[6px] text-normal text-slate-500 outline-none font-normal"
        placeholder="Your prompt"
        onChange={onchange}
        value={value}
        onFocus={(e) => {
          console.log("input focused");
          e.stopPropagation();
        }}
      />
    </div>
  );
};

export default Input;
