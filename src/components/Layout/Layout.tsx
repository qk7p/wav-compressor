import React, { useState } from "react";
import { Header } from "components";
import "./Layout.scss";

interface ILayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="Layout">
      <Header />
      <div className="Layout-Container">{children}</div>
    </div>
  );
};
