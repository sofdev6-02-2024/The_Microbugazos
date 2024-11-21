import { ThemeProvider } from "@/commons/context/ThemeContext";
import MembersComponent from "@/components/members-store/MembersComponent";

export default function SignupPage() {
  return (
    <ThemeProvider>
      <main>
        <MembersComponent/>
      </main>
    </ThemeProvider>
  );
}
