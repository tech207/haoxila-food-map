import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ===== HaoXiLa Brand Color System =====
        brand: {
          deep: "#3F2218",      // Logo、主 Heading、顧客系統深色區塊
          mid: "#8E4525",       // Sub-heading、次要連結
          accent: "#B85D33",    // 主要 CTA 按鈕、強調標籤
        },
        customer: {
          bg: "#FFF8F1",        // 顧客系統頁面背景
        },
        merchant: {
          dark: "#18120F",      // 商家系統深色 Sidebar 背景
        },
        card: {
          bg: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
