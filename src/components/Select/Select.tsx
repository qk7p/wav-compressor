import classNames from "classnames";
import React, { FocusEventHandler } from "react";
import {
  ActionMeta,
  default as ReactSelect,
  GroupBase,
  SingleValue,
  StylesConfig,
} from "react-select";
import "./Select.scss";

export interface ISelectOption {
  value: string;
  label: string;
}

export interface ISelectProps {
  className?: string;
  children?: React.ReactNode;
  onBlur?: FocusEventHandler;
  onChange?:
    | ((
        newValue: SingleValue<ISelectOption>,
        actionMeta: ActionMeta<ISelectOption>
      ) => void)
    | undefined;
  onFocus?: FocusEventHandler;
  styles?: StylesConfig<ISelectOption, false, GroupBase<ISelectOption>>;
  value: ISelectOption;
  options: ISelectOption[];
  clearable?: boolean;
}

export const Select: React.FC<ISelectProps> = ({
  className,
  children,
  options,
  styles,
  value,
  clearable,
  onBlur,
  onChange,
  onFocus,
}) => {
  return (
    <ReactSelect
      className={classNames("Select", className)}
      blurInputOnSelect
      closeMenuOnSelect
      options={options}
      styles={styles}
      value={value}
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={onChange}
      classNamePrefix={"ReactSelect"}
      isClearable={clearable}
      menuPosition={"fixed"}
    />
  );
};
