/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  colors: {
    green: colors.green,
    white: colors.white,
    primary: "#121212",
    blue: "#1fb6ff",
    jacarta: {
      50: "#f4f4f7",
      100: "#e9e9ef",
      200: "#c9c8d8",
      300: "#a9a7c1",
      400: "#686492",
      500: "#272263",
      600: "#231f59",
      700: "#1d1a4a",
      800: "#17143b",
      900: "#131131"
    },
    gray: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b"
    },
    cerise: {
      50: "#fff1f2",
      100: "#ffe4e6",
      200: "#fecdd3",
      300: "#fda4af",
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d48",
      700: "#be123c",
      800: "#9f1239",
      900: "#881337"
    },
    pink: {
      50: "#fdf2f8",
      100: "#fce7f3",
      200: "#fbcfe8",
      300: "#f9a8d4",
      400: "#f472b6",
      500: "#ec4899",
      600: "#db2777",
      700: "#be185d",
      800: "#9d174d",
      900: "#831843"
    },

    purple: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea",
      700: "#7e22ce",
      800: "#6b21a8",
      900: "#581c87"
    },
    indigo: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95"
    },

    azure: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a"
    },

    teal: {
      50: "#effdfd",
      100: "#d2f7f9",
      200: "#aaf0f4",
      300: "#76e4ec",
      400: "#39d0dd",
      500: "#14b4c6",
      600: "#0892a2",
      700: "#097684",
      800: "#0b5e6b",
      900: "#0d4f5a"
    },
    black: "#000000",

    saffron: {
      50: "#fefce8",
      100: "#fef9c3",
      200: "#fef08a",
      300: "#fde047",
      400: "#facc15",
      500: "#eab308",
      600: "#ca8a04",
      700: "#a16207",
      800: "#854d0e",
      900: "#713f12"
    },
    tangerine: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f"
    },
    pumpkin: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316",
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12"
    },
    coral: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d"
    },
    violet: {
      50: "#f5f3ff ",
      100: "#ede9fe ",
      200: "#ddd6fe ",
      300: "#c4b5fd ",
      400: "#a78bfa ",
      500: "#8b5cf6 ",
      600: "#7c3aed ",
      700: "#5b21b6 ",
      800: "#5b21b6 ",
      900: "#4c1d95 "
    },
    red: {
      50: "#ffe7e7",
      100: "#ffcfcf",
      200: "#ff9e9e",
      300: "#ff6e6e",
      400: "#ff3d3d",
      500: "#ff0d0d",
      600: "#cc0a0a",
      700: "#990808",
      800: "#660505",
      900: "#330303"
    },
    /* Background */
    "window-dark": {
      50: "#4b4b4b",
      100: "#454545",
      200: "#404040",
      300: "#3b3b3b",
      400: "#353535",
      500: "#303030",
      600: "#2b2b2b",
      700: "#252525",
      800: "#212121",
      900: "#1c1c1c"
    },
    "window-light": {
      50: "#ffffff",
      100: "#fdfdfd",
      200: "#fcfcfc",
      300: "#fafafa",
      400: "#f5f5f5",
      500: "#d9d9d9",
      600: "#bfbfbf",
      700: "#a6a6a6",
      800: "#8c8c8c",
      900: "#737373"
    },

    "accent-color1": {
      50: "#b8c7fd",
      100: "#a5bcfb",
      200: "#92b2fa",
      300: "#7ea7f8",
      400: "#6b9cf7",
      500: "#5691f5",
      600: "#4286f4",
      700: "#007bff",
      800: "#0b68c2",
      900: "#0d5fbc"
    },
    problem: {
      50: "#f5b7b1",
      100: "#f1948a",
      200: "#ec7063",
      300: "#e74c3c",
      400: "#d9534f",
      500: "#ff4949",
      600: "#d33d3d",
      700: "#a02f2f",
      800: "#9c2500",
      900: "#8b2300"
    },
    "btn-colori": "#0d5fbc",
    /* Text */
    "text-dark": "#f5f5f5",
    "text-medium": "#b3b3b3",
    "text-light": "#1c1c1c",
    /* Accent color */
    brand: "#007bff",

    /* Interaction states */
    "hover-bg": "#2d2d2d",
    "active-bg": "#3d3d3d",

    /* Status colors */
    success: "#3fb54f",
    warning: "#ffcc00"
  },
  extend: {}
};
export const plugins = [];
