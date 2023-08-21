import classNames from "classnames";
import { ISelectOption, Select } from "components/Select/Select";
import React, { useState } from "react";
import { SingleValue } from "react-select";
import { sampleRateData } from "./SampleRateData";
import "./UploadedItemSelect.scss";

export interface IUploadedItemSelect {
  selectedOption: ISelectOption;
  className?: string;
  onSelectChange: (selectedOption: ISelectOption) => void;
}

export const UploadedItemSelect: React.FC<IUploadedItemSelect> = ({
  selectedOption,
  className,
  onSelectChange,
}) => {
  const [isSelectOpened, setIsSelectOpened] = useState(false);

  const options = sampleRateData;

  const handleBlur = () => {
    setIsSelectOpened(false);
  };

  const handleFocus = () => {
    setIsSelectOpened(true);
  };

  const handleChange = (selectedOption: SingleValue<ISelectOption>) => {
    if (selectedOption) {
      onSelectChange(selectedOption);
    }
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
      clearable={false}
      className={classNames(
        "UploadedItem-Select",
        {
          "UploadedItem-Select__active": isSelectOpened,
        },
        className
      )}
    />
  );
};
