import React from 'react';
import axios from 'axios';

interface InputBoxProps {
  inputValue: string;
  setInputValue: (value: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ inputValue, setInputValue }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    const numericValue = parseFloat(inputValue);
    console.log("Sending:", numericValue);

    try {
      const response = await axios.post('http://localhost:3001/api/number', {
        number: numericValue,
      });
      console.log("✅ Server response:", response.data);
    } catch (error) {
      console.error("❌ Error sending number:", error);
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Enter a number"
        value={inputValue}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>amount</button>
    </div>
  );
};

export default InputBox;