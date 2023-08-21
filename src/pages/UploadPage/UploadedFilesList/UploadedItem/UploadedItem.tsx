import classNames from "classnames";
import { Select } from "components";
import IconButton from "components/Button/IconButton";
import Icon from "components/Icon";
import { ISelectOption } from "components/Select/Select";
import { dataItem, useData } from "hooks/useData";
import React, { ChangeEvent, useEffect, useState } from "react";
import { SingleValue } from "react-select";
import { convert } from "utils/compressor";
import { sampleRateData } from "./UploadedItemSelect/SampleRateData";
import "./UploadedItem.scss";
import { UploadedItemSelect } from "./UploadedItemSelect/UploadedItemSelect";

export interface IUploadedFile {
  file: dataItem;
  onDelete: (file: File) => void;
  onConvert: (file: File, sampleRate: string) => void;
}

const UploadedItem: React.FC<IUploadedFile> = ({
  file,
  onConvert,
  onDelete,
}) => {
  const [isDownloadEnabled, setIsDownloadEnabled] = useState(
    file.convertedFile
  );
  const [selectedOption, setSelectedOption] = useState<ISelectOption>(
    file.sampleRate
  );

  var isFileSizeBigger = false;
  if (file.convertedFile && file.convertedFile?.size < file.sourceFile.size)
    isFileSizeBigger = true;
  else isFileSizeBigger = false;

  const [isConvertedFileSizeSmaller, setIsConvertedFileSizeSmaller] =
    useState(isFileSizeBigger);

  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = (option: ISelectOption) => {
    file.sampleRate = option;
    setSelectedOption(option);
  };

  const handleDownload = () => {
    const elemenet = document.createElement("a");
    if (file.convertedFile) {
      elemenet.href = URL.createObjectURL(file.convertedFile);
      elemenet.download = `${file.sourceFile.name.replace(/\.[^.]*$/, "")}_${
        file.sampleRate.label
      }.wav`;

      document.body.appendChild(elemenet);
      elemenet.click();
    }
  };

  const handleDelete = () => {
    onDelete(file.sourceFile);
  };

  const handleConvert = () => {
    onConvert(file.sourceFile, selectedOption.value);
  };

  return (
    <div className={"UploadedItem"}>
      {isLoading ? (
        <div>isLoading</div>
      ) : (
        <>
          <Icon type="Wav" className="UploadedItemLabelIcon" />
          <p className="UploadedItem-FileName"> {file.sourceFile.name}</p>

          {file.convertedFile ? (
            <p
              className={classNames("UploadedItem-FileSize", {
                "UploadedItem-FileSize__decreased": isConvertedFileSizeSmaller,
                "UploadedItem-FileSize__increased": !isConvertedFileSizeSmaller,
              })}
            >
              {Math.floor(file.convertedFile.size / 1024)} kb
            </p>
          ) : (
            <p className="UploadedItem-FileSize">
              {Math.floor(file.sourceFile.size / 1024)} kb
            </p>
          )}

          <UploadedItemSelect
            selectedOption={selectedOption}
            onSelectChange={handleSelect}
            className={"UploadedItem-Select"}
          />
          <IconButton
            type="Convert"
            className={classNames(
              "UploadedItemButtonIcon",
              "UploadedItem-ConvertButton"
            )}
            onClick={handleConvert}
            title={"Конвертировать"}
          />
          <IconButton
            type="Download"
            isDisabled={!isDownloadEnabled}
            className={classNames(
              "UploadedItemButtonIcon",
              "UploadedItem-DownloadButton"
            )}
            onClick={handleDownload}
            title={"Скачать"}
          />
          <IconButton
            type="Delete"
            onClick={handleDelete}
            className={classNames(
              "UploadedItemButtonIcon",
              "UploadedItem-DeleteButton"
            )}
            title={"Удалить"}
          />
        </>
      )}
    </div>
  );
};

export default UploadedItem;
