import LoginForm from "@/components/auth/LoginForm";
import { ThemeProvider } from "../../contexts/ThemeContext";

export default function SignupPage() {
  return (
    <ThemeProvider>
      <main>
        <LoginForm />
      </main>
    </ThemeProvider>
  );
}
