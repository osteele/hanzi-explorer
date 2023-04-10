import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  colors: {
    brand: {
      50: "#f5f8fa",
      100: "#eaf1f6",
      200: "#cdd9e9",
      300: "#afc1dc",
      400: "#719bd1",
      500: "#3365c6",
      600: "#2e5bb8",
      700: "#274f9a",
      800: "#20437c",
      900: "#19375e",
    },
    gray: {
      50: "#f7fafc",
      100: "#edf2f7",
      200: "#e2e8f0",
      300: "#cbd5e0",
      400: "#a0aec0",
      500: "#718096",
      600: "#4a5568",
      700: "#2d3748",
      800: "#1a202c",
      900: "#171923",
    },
  },
  fonts: {
    heading: "Open Sans",
    body: "Roboto",
    logotype: "Nunito",
  },
});
