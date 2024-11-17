import SignupForm from "@/components/auth/SignupForm";
import { ThemeProvider, useTheme } from "../../contexts/ThemeContext";

export default function SignupPage() {
  return (
    <ThemeProvider>
      <main>
        <SignupForm />
      </main>
    </ThemeProvider>
  );
}
