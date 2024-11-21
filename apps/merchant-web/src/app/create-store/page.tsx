"use client";
import { ThemeProvider } from "@/commons/context/ThemeContext";
import CreateNewStoreForm from "@/components/store/crud-store/CreateNewStoreForm";

export default function CreateNewStore() {
  return (
    <ThemeProvider>
      <main>
        <CreateNewStoreForm />
      </main>
    </ThemeProvider>
  );
}
