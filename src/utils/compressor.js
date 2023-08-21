import { WaveFile } from "wavefile";

export function convert(inputAudio, sampleRate) {
  var wav = new WaveFile(inputAudio);
  wav.toSampleRate(sampleRate)
  return wav.toBuffer();
}
