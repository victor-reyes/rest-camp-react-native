import { Image } from "react-native-compressor";
import { CompressorOptions } from "react-native-compressor/lib/typescript/Image";

export async function compressImageToBuffer(uri: string, options: CompressorOptions) {
  const compressedUri = await Image.compress(uri, options);
  return fetch(compressedUri).then(res => res.arrayBuffer());
}
