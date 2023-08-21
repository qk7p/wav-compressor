import JSZip from "jszip";

export function createArchive(data) {
  var zip = new JSZip();
  data.map((item) => {
    zip.file(
      `${item.sourceFile.name.replace(/\.[^.]*$/, "")}_${
        item.sampleRate.label
      }.wav`,
      item.convertedFile
    );
  });
  var promise = zip.generateAsync({ type: "uint8array" });
  return promise;
}
