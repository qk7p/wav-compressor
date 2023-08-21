import { DropZone } from "components";
import Button from "components/Button";
import { useData } from "hooks/useData";
import React, { ChangeEvent, useRef, useState } from "react";
import { FormatInfoContainer } from "./FormatInfoContainer/FormatInfoContainer";
import UploadedFilesList from "./UploadedFilesList/UploadedFilesLists";
import "./UploadPage.scss";

export const UploadPage: React.FC = () => {
  const filePicker = useRef<HTMLInputElement>(null);
  const [
    dataArray,
    uploadData,
    deleteItem,
    convertItem,
    convertAllData,
    deleteAllData,
    archiveAllData,
    isMultiDownloadEnabled,
    getDataFromDrop,
  ] = useData([]);

  const handlePick = () => {
    filePicker.current?.click();
  };
  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    uploadData(event);
  };

  return (
    <div className="UploadPage">
      <h1>Сжатие WAV файлов</h1>
      <h2>Преобразование файлов wav онлайн</h2>
      <div className="UploadContainer">
        <DropZone
          className="UploadContainer-DropZone"
          onFilesDrop={getDataFromDrop}
        ></DropZone>
        <Button onClick={handlePick} className="UploadButton">
          Загрузить файлы
        </Button>
        <span>Перетащите файлы сюда. Максимальный размер файла - 100 MB</span>
      </div>
      {dataArray.length < 1 ? (
        <FormatInfoContainer />
      ) : (
        <UploadedFilesList
          dataArray={dataArray}
          onConvert={convertItem}
          onDelete={deleteItem}
          onMultiConvert={convertAllData}
          onMultiDelete={deleteAllData}
          onArchiveAllData={archiveAllData}
          isMultiDonwloadEnabled={isMultiDownloadEnabled}
        />
      )}

      <input
        className="hidden"
        type="file"
        onChange={handleUpload}
        multiple
        accept="audio/wav,.wav"
        ref={filePicker}
      />
    </div>
  );
};
