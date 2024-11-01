import SignupForm from "@/components/auth/SignupForm";
import { ThemeProvider, useTheme } from "../../commons/context/ThemeContext";

export default function SignupPage() {
  return (
    <ThemeProvider>
      <main>
        <SignupForm />
      </main>
    </ThemeProvider>
  );
}
