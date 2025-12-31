import React from "react";

// Table Component
const Table = ({ children, className = "" }) => {
    return <table className={`min-w-full ${className}`}>{children}</table>;
};

// TableHeader Component
const TableHeader = ({ children, className = "" }) => {
    return <thead className={className}>{children}</thead>;
};

// TableBody Component
const TableBody = ({ children, className = "" }) => {
    return <tbody className={className}>{children}</tbody>;
};

const TableRow = ({ children, className = "", ...props }) => {
    return (
        <tr
            className={`cursor-pointer ${className}`}
            {...props}
        >
            {children}
        </tr>
    );
};

// TableCell Component
const TableCell = ({ children, isHeader = false, className = "" }) => {
    const CellTag = isHeader ? "th" : "td";
    return <CellTag className={className}>{children}</CellTag>;
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
