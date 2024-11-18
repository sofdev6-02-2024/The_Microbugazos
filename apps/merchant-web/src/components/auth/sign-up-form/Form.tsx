import { useSignUpForm } from "@/hooks/sign-up/useSignUp";
import { FormInput } from "../FormInputProps";
import { MessageDisplay } from "../MessageDisplay";
import { SocialAuth } from "../SocialAuthProps";
import "@/styles/auth/sign-up-form/form.css";

export const Form = () => {
  const {
    formData,
    errors,
    message,
    messageType,
    handleSubmit,
    handleInputChange,
    handleGoogleSignIn,
    handleFacebookSignIn,
  } = useSignUpForm();

  return (
    <form noValidate className="form" onSubmit={handleSubmit}>
      <FormInput
        id="username"
        value={formData.username}
        onChange={handleInputChange}
        label="Username"
        error={errors.username}
      />

      <FormInput
        id="email"
        value={formData.email}
        onChange={handleInputChange}
        label="Email"
        error={errors.email}
      />

      <FormInput
        id="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        label="Password"
        error={errors.password}
      />

      <FormInput
        id="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        label="Confirm Password"
        error={errors.password}
      />

      <button type="submit" className="sign-up-button">
        SIGN UP
      </button>

      <MessageDisplay message={message} type={messageType} />

      <SocialAuth
        onGoogleSignIn={handleGoogleSignIn}
        onFacebookSignIn={handleFacebookSignIn}
        message={"Or Sign up with"}
      />
    </form>
  );
};
