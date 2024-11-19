"use client";

import React from "react";

interface SubmissionMessageProps {
  message?: string;
}

const SubmissionMessage: React.FC<SubmissionMessageProps> = ({ message }) =>
  message ? <p className="submission-message green">{message}</p> : null;

export default SubmissionMessage;
