import SignupForm from "@/components/auth/SignupForm";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function SignupPage() {
  return (
    <ThemeProvider>
      <main>
        <SignupForm />
      </main>
    </ThemeProvider>
  );
}
