import React, { useRef } from "react";

type SearchProps = {
  name: string;
  placeholder: string;
  onChange: Function;
};

const SearchBox = ({ name, placeholder, onChange }: SearchProps) => {
  const inputBox = useRef<HTMLInputElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleSearch = () => {
    if (inputBox && inputBox.current) {
      onChange(inputBox.current.value);
    }
  };

  return (
    <div>
      <input
        type="text"
        name={name}
        ref={inputBox}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBox;
