import React from "react";
import classNames from "classnames";
import "./IconButton.scss";
import { Button, IButtonProps } from "../Button";
import Icon from "components/Icon";
import { IconType } from "components/Icon/IconType";

export interface IIconButtonProps extends IButtonProps {
  className?: string;
  type: IconType;
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

export const IconButton: React.FC<IIconButtonProps> = ({
  className,
  type,
  isDisabled,
  onClick,
  ...rest
}) => {
  return (
    <Button
      className={classNames("IconButton", className)}
      isDisabled={isDisabled}
      onClick={onClick}
      {...rest}
    >
      <Icon type={type} />
    </Button>
  );
};
