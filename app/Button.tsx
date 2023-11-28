"use client";

import Link from "next/link";

interface ButtonProps {
  label: string,
  link?: string
}

export default function Button({label, link}: ButtonProps) {
  return (
    <Link className="mr-3" href={link}>
      <span>{label}</span>
    </Link>
  );
}
