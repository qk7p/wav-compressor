import React from "react";
import classNames from "classnames";
import "./Button.scss";

export type ButtonType = "button" | "submit" | "reset";

export interface IButtonProps extends React.DOMAttributes<HTMLButtonElement> {
  className?: string;
  isDisabled?: boolean;
  typeButton?: ButtonType;
  onClick?: (event: React.MouseEvent) => void;
  children?: React.ReactNode;
  title?: string;
}

export const Button: React.FC<IButtonProps> = ({
  className,
  isDisabled,
  typeButton,
  onClick,
  children,
  title,
  ...rest
}) => {
  return (
    <button
      className={classNames("Button", className, {
        Button__disabled: isDisabled,
      })}
      disabled={isDisabled}
      type={typeButton}
      onClick={onClick}
      {...rest}
      title={title}
    >
      <span>{children}</span>
    </button>
  );
};
