import { ReactNode } from "react";
import * as CSS from "csstype";

export interface GridProps {
  children: ReactNode;
  style?: React.CSSProperties;
  columns?: number | CSS.Property.GridTemplateColumns;
  smallScreenColumns?: number | CSS.Property.GridTemplateColumns;
  rows?: number | CSS.Property.GridTemplateColumns;
  rowGap?: string;
  columnGap?: string;
  className?: string;
  uniqueClass?: string;
  alignCenter?: boolean;
  alignStart?: boolean;
  height?: CSS.Property.Height;
}

export interface Gap {
  [key: string]: string;
}
