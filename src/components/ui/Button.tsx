import Image from "next/image";
import { CSSProperties, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  iconSrc?: string;
  iconAlt?: string;
  className?: string;
  variant?: "solid" | "gradient";
  bgColor?: string;
  textColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
};

export default function Button({
  children,
  iconSrc,
  iconAlt = "Icon",
  className = "",
  variant = "solid",
  bgColor = "#FFDAD2",
  textColor,
  gradientFrom = "#FF7A2C",
  gradientTo = "#9B3F00",
  width,
  height,
  style,
}: ButtonProps) {
  const resolvedTextColor = textColor ?? (variant === "gradient" ? "#FFFFFF" : "#9B3F00");

  const buttonStyle: CSSProperties = {
    color: resolvedTextColor,
    width,
    height,
    ...(variant === "gradient"
      ? { backgroundImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }
      : { backgroundColor: bgColor }),
    ...style,
  };

  return (
    <div
      className={`flex items-center gap-4 justify-center px-14 py-6 rounded-full text-2xl font-jakarta font-bold cursor-pointer active:scale-95 transition-transform ${className}`}
      style={buttonStyle}
    >
      {iconSrc && (
        <Image className="mt-1" src={iconSrc} alt={iconAlt} width={22} height={22} />
      )}
      {children}
    </div>
  );
}
