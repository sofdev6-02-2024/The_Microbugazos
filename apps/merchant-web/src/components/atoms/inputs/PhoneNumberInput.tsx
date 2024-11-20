import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <PhoneInput
      country={"us"}
      value={value}
      onChange={onChange}
      inputStyle={{
        width: "100%",
        color: "black",
        border: "none",
        fontSize: "16px",
        backgroundColor: "transparent",
      }}
      containerStyle={{
        padding: "12px 12px 12px 0",
        width: "100%",
        color: "black",
        outline: "none",
        border: "none",
        borderRadius: "4px",
        fontSize: "16px",
      }}
    />
  );
};

export default PhoneNumberInput;
