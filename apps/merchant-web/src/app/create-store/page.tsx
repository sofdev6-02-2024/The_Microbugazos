"use client";
import { ThemeProvider } from "@/commons/context/ThemeContext";
import CreateNewStoreForm from "@/components/store/CreateNewStoreForm";

export default function CreateNewStore() {
  return (
    <ThemeProvider>
      <main>
        <CreateNewStoreForm />
      </main>
    </ThemeProvider>
  );
}
