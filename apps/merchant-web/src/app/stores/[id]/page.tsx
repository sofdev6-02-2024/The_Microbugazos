"use client"

import React from "react";
import { useParams } from "next/navigation";
import { ThemeProvider } from "@/commons/context/ThemeContext";
import { UpdateStore } from "@/components/store/UpdateStore";

export default function StorePage() {
  const { id } = useParams();

  return (
    <ThemeProvider>
      <main>
        <UpdateStore id={id as string} />
      </main>
    </ThemeProvider>
  );
}
