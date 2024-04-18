import React, { ReactNode, useCallback, useEffect, useMemo } from "react";
import * as CSS from "csstype";
import { v4 as uuidv4 } from "uuid";
import { useMediaQuery } from "react-responsive";

interface GridProps {
  children: ReactNode;
  style?: React.CSSProperties;
  columns?: number | CSS.Property.GridTemplateColumns;
  smallScreenColumns?: number | CSS.Property.GridTemplateColumns;
  rows: number | CSS.Property.GridTemplateColumns;
  rowGap?: string;
  columnGap?: string;
  className?: string;
  uniqueClass?: string;
  alignCenter?: boolean;
  alignStart?: boolean;
  height: CSS.Property.Height;
}

interface Gap {
  [key: string]: string;
}

const breakpoints = {
  sm: "576",
  md: "768",
  lg: "992",
  xlg: "1200",
};

const toCssProperty = (property: string) => {
  return property.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
};
const stylesToCSS = (styles: React.CSSProperties) =>
  Object.entries(styles)
    .map(([key, value]) => `${toCssProperty(key)}:${value};`)
    .join("");

const Grid = ({
  children,
  className,
  style,
  columns,
  smallScreenColumns,
  rows,
  rowGap,
  columnGap,
  uniqueClass,
  alignCenter,
  alignStart,
  height,
}: GridProps) => {
  // Check screen size to manage responsive
  const hasWideScreen = useMediaQuery({
    query: `(min-width: ${breakpoints.lg}px)`,
  });
  // Generate unique className
  const uniqueClassName: string = useMemo(
    () => uniqueClass || `grid-${uuidv4().slice(0, 8)}`,
    [uniqueClass]
  );

  // Get gap from props
  const getGap = useCallback((g?: string) => {
    const gaps: Gap[] = [
      { xs: "0.25rem" },
      { s: "0.5rem" },
      { m: "0.75rem" },
      { l: "1rem" },
      { xl: "1.5rem" },
      { xxl: "1.75rem" },
      { xxxl: "2rem" },
    ];
    if (g) {
      const selectedGap = gaps.find((gap) => gap[g]);
      return selectedGap ? selectedGap[g] : "1.5rem";
    }
    return "1.5rem";
  }, []);

  const getColumnPattern = useCallback(() => {
    if (!hasWideScreen) {
      return smallScreenColumns || "1fr";
    }
    return columns || "auto";
  }, [columns, hasWideScreen, smallScreenColumns]);
  // Defines grid CSS properties
  const styles: React.CSSProperties = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: getColumnPattern(),
      gridTemplateRows: rows,
      columnGap: getGap(columnGap),
      rowGap: getGap(rowGap),
      height: height,
      ...(alignCenter && { alignItems: "center" }),
      ...(alignStart && { alignItems: "start" }),
      ...style,
    }),
    [
      alignCenter,
      alignStart,
      columnGap,
      getColumnPattern,
      getGap,
      height,
      rowGap,
      rows,
      style,
    ]
  );
  const hasClassNameCreated = useCallback(() => {
    const documentStyles = Array.from(
      document.head.getElementsByTagName("style")
    );
    for (const docStyle of documentStyles) {
      if (docStyle.innerText?.includes(uniqueClassName)) {
        return true;
      }
    }
    return false;
  }, [uniqueClassName]);

  // Add custom <style> sheet in <head>
  useEffect(() => {
    const styleElement = document.createElement("style");
    if (!hasClassNameCreated()) {
      styleElement.innerHTML = `.${uniqueClassName} {${stylesToCSS(styles)}}`;
      document.head.appendChild(styleElement);
    }
    return () => {
      if (!uniqueClass) {
        document.head.removeChild(styleElement);
      }
    };
  }, [hasClassNameCreated, styles, uniqueClass, uniqueClassName]);

  return (
    <div className={`${uniqueClassName}${className ? " " + className : ""}`}>
      {children}
    </div>
  );
};

Grid.defaultProps = {
  rows: "auto",
  height: "fit-content",
};
export default Grid;
