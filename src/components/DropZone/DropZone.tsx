import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./DropZone.scss";

export interface IDropZoneProps {
  children?: React.ReactNode;
  className?: string;
  onDragIn?: () => void;
  onDragOut?: () => void;
  onDrop?: () => void;
  onFilesDrop?: (files: File[]) => void;
}

export const DropZone: React.FC<IDropZoneProps> = ({
  onDragIn,
  onDragOut,
  onDrop,
  onFilesDrop,
  children,
  className,
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const dropZoneRef = useRef<null | HTMLDivElement>(null);

  const handleDragIn = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("DragIn");
    onDragIn?.();
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setIsDragActive(true);
    } else {
      setIsDragActive(false);
    }
  };

  const handleDragOut = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onDragOut?.();

    setIsDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(true);
    onDrop?.();

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      var filesToUpload: File[] = [];

      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        var item = event.dataTransfer.files.item(i);
        if (item !== null) filesToUpload.push(item);
      }

      onFilesDrop?.(filesToUpload);
      setIsDragActive(false);
      event.dataTransfer.clearData();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(true);
  };

  return (
    <div
      className={classNames(
        "DropZone",
        {
          DropZone__active: isDragActive,
        },
        className
      )}
      ref={dropZoneRef}
      onDragLeave={handleDragOut}
      onDragEnter={handleDragIn}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {children}
    </div>
  );
};
