import { ReactNode } from "react";
import * as CSS from "csstype";

export interface GridContextConfigurationProps {
  minWidth?: number; // The minimum width where the grid displays on 1 column (if no smallScreenColumns is defined)
  gaps?: Gap[];
}

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
  alignItems?: CSS.Property.AlignItems;
  height?: CSS.Property.Height;
}

export interface Gap {
  [key: string]: string;
}
