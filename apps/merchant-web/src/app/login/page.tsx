import LoginForm from "@/components/auth/LoginForm";
import { ThemeProvider } from "../../commons/context/ThemeContext";

export default function SignupPage() {
    return (
        <ThemeProvider>
            <main>
                <LoginForm />
            </main>
        </ThemeProvider>
    );
}
