import { ISelectOption } from "components/Select/Select";
import { ChangeEvent, useEffect, useState } from "react";
import { createArchive } from "utils/archiver";
import { convert } from "utils/compressor";

export type dataItem = {
  sourceFile: File;
  convertedFile: Blob | null;
  isDownloadable: boolean;
  sampleRate: ISelectOption;
};

export function useData(
  initialArray: dataItem[]
): [
  dataItem[],
  (event: ChangeEvent<HTMLInputElement>) => void,
  (file: File) => void,
  (file: File, sampleRate: string) => void,
  (sampleRate: string) => void,
  () => void,
  () => Promise<Blob>,
  boolean,
  (inputData: File[]) => void
] {
  const [dataArray, setDataArray] = useState<dataItem[]>(initialArray);
  const [isMultiDownloadEnabled, setisMultiDownloadEnabled] = useState(false);

  useEffect(() => {
    setisMultiDownloadEnabled(checkAllConverted());
  }, [dataArray]);

  const checkAllConverted = (): boolean => {
    var isDownloadable = true;
    if (dataArray.length == 0) {
      isDownloadable = false;
    }
    for (var i = 0; i < dataArray.length; i++) {
      if (!dataArray[i].convertedFile && dataArray) {
        isDownloadable = false;
      }
    }
    return isDownloadable;
  };

  const uploadData = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const tempArray: dataItem[] = [];
      for (var i = 0; i < event.target.files.length; i++) {
        if (
          event.target.files[i].type == "audio/wav" &&
          event.target.files[i].size < 104857600
        )
          tempArray.push({
            sourceFile: event.target.files[i],
            convertedFile: null,
            isDownloadable: false,
            sampleRate: { value: "44100", label: "44100 Hz" },
          });
      }
      setDataArray((prev) => prev.concat(tempArray));
    }
  };

  const getDataFromDrop = (inputData: File[]) => {
    const tempArray: dataItem[] = [];
    for (var i = 0; i < inputData.length; i++) {
      if (inputData[i].type == "audio/wav" && inputData[i].size < 104857600)
        tempArray.push({
          sourceFile: inputData[i],
          convertedFile: null,
          isDownloadable: false,
          sampleRate: { value: "44100", label: "44100 Hz" },
        });
    }
    setDataArray((prev) => prev.concat(tempArray));
  };

  const convertItem = (file: File, sampleRate: string) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      const toUint8Array = new Uint8Array(reader.result as ArrayBuffer);
      const fromUint8Array = convert(toUint8Array, +sampleRate);
      const convertedAudio = new Blob([fromUint8Array], {
        type: "audio/wav",
      });
      setDataArray((prev) => {
        const foundIndex = prev.findIndex((e) => e.sourceFile == file);
        prev[foundIndex].convertedFile = convertedAudio;
        prev[foundIndex].isDownloadable = true;
        prev[foundIndex].sampleRate = {
          value: sampleRate,
          label: `${sampleRate} Hz`,
        };
        return [...prev];
      });
    };
  };

  const convertAllData = (sampleRate: string) => {
    dataArray.map((item) => {
      convertItem(item.sourceFile, sampleRate);
    });
  };

  const deleteAllData = () => {
    setDataArray([]);
  };

  const deleteItem = (file: File) => {
    setDataArray((prevState) => {
      const idx = prevState.findIndex((item) => item.sourceFile === file);
      return [...prevState.slice(0, idx), ...prevState.slice(idx + 1)];
    });
  };

  const archiveAllData = async () => {
    const toUint8Array = await createArchive(dataArray);
    const fromUint8Array = typedArrayToBuffer(toUint8Array);
    return new Blob([fromUint8Array], {
      type: "application/zip",
    });
  };

  function typedArrayToBuffer(array: Uint8Array): ArrayBuffer {
    return array.buffer.slice(
      array.byteOffset,
      array.byteLength + array.byteOffset
    );
  }

  return [
    dataArray,
    uploadData,
    deleteItem,
    convertItem,
    convertAllData,
    deleteAllData,
    archiveAllData,
    isMultiDownloadEnabled,
    getDataFromDrop,
  ];
}
