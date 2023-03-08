import React from "react";

type CategoryButtonProps = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export const CategoryButton = ({
  isActive,
  onClick,
  children,
}: CategoryButtonProps) => {
  return (
    <button
      className={`inline-block px-4 text-sm border-b-2 ${
        isActive
          ? "font-bold text-white border-white"
          : "font-medium text-gray-500 border-transparent"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
