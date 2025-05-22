import { memo } from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";
const EmailSvg = (props: SvgProps) => (
  <Svg {...props} aria-label="Gmail" viewBox="0 0 512 512">
    <Rect width={512} height={512} fill="#fff" rx="15%" />
    <Path fill="#f2f2f2" d="M120 392V151h272v241" />
    <Path fillOpacity={0.1} d="M256 285 120 392l-4-212" />
    <Path fill="#d54c3f" d="M120 392H97c-12 0-22-10-22-23V143h45z" />
    <Path fillOpacity={0.1} d="M317 392h77V159H82" />
    <Path fill="#f2f2f2" d="M97 121h318L256 234" />
    <Path fill="#b63524" d="M392 392h23c12 0 22-10 22-23V143h-45z" />
    <Path
      fill="none"
      stroke="#de5145"
      strokeLinecap="round"
      strokeWidth={44}
      d="m97 143 159 115 159-115"
    />
  </Svg>
);

export const Email = memo(EmailSvg);
