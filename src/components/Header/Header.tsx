import IconButton from "components/Button/IconButton";
import React from "react";
import "./Header.scss";

export const Header: React.FC = () => {
  return (
    <div className="Header">
      <IconButton type="Logo" className="HeaderLogo" />
    </div>
  );
};
