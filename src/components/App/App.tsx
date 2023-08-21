import { Layout } from "components";
import { UploadPage } from "pages";
import React from "react";
import "./App.scss";

export const App: React.FC = () => {
  return (
    <div className="App">
      <Layout>
        <UploadPage />
      </Layout>
    </div>
  );
};
