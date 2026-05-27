import React from "react";

interface TapeProps {
  className?: string;
}

export default function Tape({ className = "" }: TapeProps) {
  return <div className={`tape ${className}`} />;
}
