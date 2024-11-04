"use client"
import * as React from "react";

import { NextUIProvider } from "@nextui-org/react";
import {OptionsProvider} from "@/commons/providers/add-product-provider";

export default function Home() {
  return (
    <NextUIProvider>
    <body>
      <div>
        Hello World!
      </div>
    </body>
    </NextUIProvider>
  );
}
