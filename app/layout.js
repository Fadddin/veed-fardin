import React from "react";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import "./globals.css";

const theme = createTheme({
  primaryColor: "blue",
  defaultRadius: "md",
});

export const metadata = {
  title: "VEED.io Clone",
  description: "A replica of the VEED.io video editor interface",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" key="root">
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
