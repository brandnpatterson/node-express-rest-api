import React, { useRef, useState } from 'react';

interface Props {
  text: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<Props> = ({ text, handleChange }) => {
  const [count, setCount] = useState<{ count: number }>({ count: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  console.log(count, setCount);

  return (
    <div>
      <input ref={inputRef} type="text" value={text} onChange={handleChange} />
    </div>
  );
};

export default TextField;
