import { HTMLAttributes, ReactNode } from "react";

interface IBox extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export default function Box({ children, ...props }: IBox) {
  return <div {...props}>{children}</div>;
}
