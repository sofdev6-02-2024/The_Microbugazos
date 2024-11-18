import "@/styles/auth/sign-up-form/message-verification.css"

export const MessageVerification = () => {
  return (
    <div className="verification-message">
      <h2>Check Your Email</h2>
      <p>
        We have sent a verification link to your email address. Please click the
        link to verify your account.
      </p>
      <p>Once verified, you can login to your account.</p>
    </div>
  );
};
