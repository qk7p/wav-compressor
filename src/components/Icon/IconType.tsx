import { newGuid } from "utils/guid";
import { ReactComponent as Logo } from "../../assets/icons/Logo.svg";
import { ReactComponent as Fullscreen } from "../../assets/icons/FullScreen.svg";
import { ReactComponent as Wav } from "../../assets/icons/Wav.svg";
import { ReactComponent as Convert } from "../../assets/icons/Convert.svg";
import { ReactComponent as Download } from "../../assets/icons/Download.svg";
import { ReactComponent as Delete } from "../../assets/icons/Delete.svg";
import { ReactComponent as MultiConvert } from "../../assets/icons/MultiConvert.svg";
import { ReactComponent as MultiDownload } from "../../assets/icons/MultiDownload.svg";

export type IconType =
  | "Logo"
  | "Fullscreen"
  | "Wav"
  | "Convert"
  | "Download"
  | "Delete"
  | "MultiDownload"
  | "MultiConvert";

export const iconTypes = new Map([
  ["Logo", <Logo key={newGuid()} />],
  ["Fullscreen", <Fullscreen key={newGuid()} />],
  ["Wav", <Wav key={newGuid()} />],
  ["Convert", <Convert key={newGuid()} />],
  ["Download", <Download key={newGuid()} />],
  ["MultiConvert", <MultiConvert key={newGuid()} />],
  ["MultiDownload", <MultiDownload key={newGuid()} />],
  ["Delete", <Delete key={newGuid()} />],
]);
