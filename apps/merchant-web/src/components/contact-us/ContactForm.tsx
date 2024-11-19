"use client";

import React from "react";
import "../../css/contactUs.css";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import SubmitButton from "./SubmitButton";
import SubmissionMessage from "./SubmissionMessage";
import {useContactForm} from "../../hooks/useContactForm";

const Contact: React.FC = () => {
  const {
    formData,
    warnings,
    submissionMessage,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useContactForm();

  return (
    <div className="container">
      <div className="contact-us">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Name:"
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            warning={warnings.name}
            required
          />
          <FormInput
            label="Email:"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            warning={warnings.email}
            required
          />
          <FormTextarea
            label="Message:"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            warning={warnings.message}
            required
          />
          <SubmitButton isSubmitting={isSubmitting} />
          <SubmissionMessage message={submissionMessage} />
        </form>
      </div>
    </div>
  );
};

export default Contact;
