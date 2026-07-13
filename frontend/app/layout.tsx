import type { Metadata, Viewport } from "next";
import { Epilogue, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/providers/providers";
import "@/styles/globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  display: "swap",
});

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hôm Nay Ăn Gì? | Food App",
    template: "%s | Food App",
  },
  description:
    "Nhập nguyên liệu bạn đang có, chúng tôi sẽ gợi ý món ngon chuẩn vị nhất. Khám phá hàng nghìn công thức nấu ăn ngon mỗi ngày.",
  keywords: ["nấu ăn", "công thức", "nguyên liệu", "món ăn", "food app"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${epilogue.variable} ${jakartaSans.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
