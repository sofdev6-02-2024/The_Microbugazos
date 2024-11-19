import { useState } from "react";

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [warnings, setWarnings] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    const { name, email, message } = formData;
    const nameWarning = name.length < 5 || name.length > 50
      ? "Name should be between 5 and 50 characters."
      : "";
    const emailWarning = !email.match(/\S+@\S+\.\S+/)
      ? "Invalid email format. It should be like example@gmail.com"
      : "";
    const messageWarning = message.length < 10 || message.length > 250
      ? "Message should be between 10 and 250 characters."
      : "";

    setWarnings({ name: nameWarning, email: emailWarning, message: messageWarning });

    return !nameWarning && !emailWarning && !messageWarning;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateFields()) return;

    setIsSubmitting(true);

    const emailData = {
      to: "playhard.jala.managment@gmail.com",
      subject: `Contact Us: Request for ${formData.email}`,
      html: `<p>Name: ${formData.name}<br/>Email: ${formData.email}<br/>Message: ${formData.message}</p>`,
    };

    try {
      const response = await fetch("https://backend-fullapirest-test.onrender.com/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        setSubmissionMessage("Your request has been sent. You will soon receive a reply.");
      } else {
        setSubmissionMessage("Error submitting the form. Please try again.");
      }
    } catch (error) {
      setSubmissionMessage("Error submitting the form:\n " + {error} +"Please try again.");
    } finally {
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
      setTimeout(() => setSubmissionMessage(""), 5000);
    }
  };

  return {
    formData,
    warnings,
    submissionMessage,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};
