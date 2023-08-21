import React from "react";
import "./Icon.scss";
import classNames from "classnames";
import { IconType, iconTypes } from "./IconType";

export interface IIconProps {
  className?: string;
  type: IconType;
}

const getIcon = (type: IconType): JSX.Element =>
  iconTypes.get(type) as JSX.Element;

export const Icon: React.FC<IIconProps> = ({ className, type }) => {
  return <div className={classNames("Icon", className)}>{getIcon(type)}</div>;
};
