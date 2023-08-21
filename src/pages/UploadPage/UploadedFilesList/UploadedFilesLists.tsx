import { IconButton } from "components";
import { dataItem, useData } from "hooks/useData";
import React, { useState } from "react";
import { newGuid } from "utils/guid";
import "./UploadedFilesList.scss";
import { UploadedFilesListHeader } from "./UploadedFileslistHeader/UploadedFilelistHeader";
import UploadedItem from "./UploadedItem/UploadedItem";

export interface IUploadedFilesList {
  dataArray: dataItem[];
  onDelete: (file: File) => void;
  onConvert: (file: File, sampleRate: string) => void;
  onMultiConvert: (sampleRate: string) => void;
  onMultiDelete: () => void;
  onArchiveAllData: () => Promise<Blob>;
  isMultiDonwloadEnabled: boolean;
}

const UploadedFilesList: React.FC<IUploadedFilesList> = ({
  dataArray,
  onDelete,
  onConvert,
  onMultiConvert,
  onMultiDelete,
  onArchiveAllData,
  isMultiDonwloadEnabled,
}) => {
  return (
    <div className="UploadedFilesList">
      <UploadedFilesListHeader
        onMultiConvert={onMultiConvert}
        onMultiDelete={onMultiDelete}
        onArchiveAllData={onArchiveAllData}
        isMultiDonwloadEnabled = {isMultiDonwloadEnabled}
      />
      {dataArray.map((item) => (
        <UploadedItem
          file={item}
          key={newGuid()}
          onConvert={onConvert}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default UploadedFilesList;
