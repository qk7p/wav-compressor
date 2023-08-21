import classNames from "classnames";
import { IconButton, Select } from "components";
import { ISelectOption } from "components/Select/Select";
import React, { useEffect, useState } from "react";
import { SingleValue } from "react-select";
import { sampleRateData } from "../UploadedItem/UploadedItemSelect/SampleRateData";
import "./UploadedFilesListHeader.scss";

export interface IUploadedFilesListHeaderProps {
  onArchiveAllData: () => Promise<Blob>;
  onMultiConvert: (sampleRate: string) => void;
  onMultiDelete: () => void;
  isMultiDonwloadEnabled: boolean;
}

export const UploadedFilesListHeader: React.FC<
  IUploadedFilesListHeaderProps
> = ({
  onMultiConvert,
  onMultiDelete,
  onArchiveAllData,
  isMultiDonwloadEnabled,
}) => {
  const [selectedValue, setSelectedValue] = useState<ISelectOption>({
    value: "8000",
    label: "8000 Hz",
  });
  const [isSelectOpened, setIsSelectOpened] = useState(false);

  const [isMultiDownloadEnabled, setIsMultiDownloadEnabled] = useState(
    isMultiDonwloadEnabled
  );

  useEffect(() => {
    setIsMultiDownloadEnabled(isMultiDonwloadEnabled);
  }, [isMultiDonwloadEnabled]);
  
  const options = sampleRateData;

  const handleMultiConvert = () => {
    onMultiConvert(selectedValue.value);
  };

  const handleMultiDelete = () => {
    onMultiDelete();
  };

  const handleMultiDownload = async () => {
    var archive = await onArchiveAllData();
    const elemenet = document.createElement("a");
    if (archive) {
      elemenet.href = URL.createObjectURL(archive as Blob);
      let currentData = new Date();
      elemenet.download = `samples_${currentData.getMilliseconds()}.zip`;

      document.body.appendChild(elemenet);
      elemenet.click();
    }
  };

  const handleBlur = () => {
    setIsSelectOpened(false);
  };

  const handleFocus = () => {
    setIsSelectOpened(true);
  };

  const handleChange = (selectedOption: SingleValue<ISelectOption>) => {
    if (selectedOption) {
      setSelectedValue(selectedOption);
    }
  };

  return (
    <div className="UploadedFilesListHeader">
      <div className="UploadedFilesListHeader-FileName">
        <p>Название</p>
      </div>
      <div className="UploadedFilesListHeader-FileSize">
        <p>Размер</p>
      </div>
      <div className="UploadedFilesListHeader-LabelToAll">
        Применить ко всем
      </div>
      <div className="UploadedFilesListHeader-SelectToAll">
        <Select
          options={options}
          value={selectedValue}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          className={classNames(
            "UploadedItem-Select",
            {
              "UploadedItem-Select__active": isSelectOpened,
            },
            "UploadedFilesListHeader-Select"
          )}
        />
      </div>
      <div className="UploadedFilesListHeader-ConvertAllButton UploadedFilesListHeader-IconButton">
        <IconButton
          type="MultiConvert"
          onClick={handleMultiConvert}
          title={"Конвертировать всё"}
        />
      </div>
      <div className="UploadedFilesListHeader-DownloadAllButton UploadedFilesListHeader-IconButton">
        <IconButton
          type="MultiDownload"
          isDisabled={!isMultiDownloadEnabled}
          onClick={handleMultiDownload}
          title={"Скачать всё"}
        />
      </div>
      <div className="UploadedFilesListHeader-DeleteAllButton UploadedFilesListHeader-IconButton">
        <IconButton
          type="Delete"
          onClick={handleMultiDelete}
          title={"Удалить всё"}
        />
      </div>
    </div>
  );
};
