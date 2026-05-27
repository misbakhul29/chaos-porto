import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "glitch" | "brutalist" | "retro" | "outline";
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "glitch",
  children,
  className = "",
  ...props
}: ButtonProps) {
  let variantClasses = "";
  if (variant === "glitch") {
    variantClasses = "glitch-btn hover:cursor-cell";
  } else if (variant === "brutalist") {
    variantClasses = "border-2 border-dirty-white text-dirty-white hover:bg-dirty-white hover:text-void-black hover:cursor-cell py-3 text-sm font-bold uppercase transition-colors tracking-widest";
  } else if (variant === "retro") {
    variantClasses = "font-mono text-dirty-white hover:text-acid-green transition-colors border border-dirty-white/30 bg-void-black cursor-pointer";
  } else if (variant === "outline") {
    variantClasses = "border-2 border-dirty-white hover:bg-dirty-white hover:text-void-black hover:cursor-cell transition-colors";
  }

  return (
    <button className={`${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
