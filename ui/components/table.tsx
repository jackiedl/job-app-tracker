import React, { ReactNode, forwardRef } from "react";

// Props for Table
interface TableProps {
  children: ReactNode;  // Table content (thead, tbody, etc.)
  className?: string;   // Optional className for styling
}

// Props for TableHeader
interface TableHeaderProps {
  children: ReactNode; // Header row(s)
  className?: string; // Optional className for styling
}

// Props for TableBody
interface TableBodyProps {
  children: ReactNode; // Body row(s)
  className?: string; // Optional className for styling
}

// Props for TableRow
interface TableRowProps {
  children: ReactNode; // Cells (th or td)
  className?: string; // Optional className for styling
}

// Props for TableCell
interface TableCellProps {
  children: ReactNode; // Cell content
  isHeader?: boolean; // If true, renders as <th>, otherwise <td>
  className?: string; // Optional className for styling
  colspan?: number; // Optional column length
}

// Table Component
const Table: React.FC<TableProps> = ({ children, className }) => {
  return <table className={`${className}`}>{children}</table>;
};

// TableHeader Component
const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
  return <thead className={className}>{children}</thead>;
};

// TableBody Component
const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
  return <tbody className={className}>{children}</tbody>;
};

// TableRow Component
const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
  return <tr className={className}>{children}</tr>;
};
// TableRow Component with ref
const TableRowRef = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, className }, ref) => {
    return <tr ref={ref} className={className}>{children}</tr>;
  }
);

// TableCell Component
const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className,
  colspan = 1,
}) => {
  const CellTag = isHeader ? "th" : "td";
  return <CellTag colSpan={colspan} className={` ${className}`}>{children}</CellTag>;
};

export { Table, TableHeader, TableBody, TableRow, TableRowRef, TableCell };