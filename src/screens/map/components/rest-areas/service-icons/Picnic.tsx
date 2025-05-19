import Svg, { SvgProps, Path } from "react-native-svg";
export function Picnic(props: SvgProps) {
  return (
    <Svg {...props} viewBox="0 0 606 606">
      <Path
        fill="#fff"
        d="M38 1h530c20 0 37 17 37 37v530a38 38 0 0 1-37 37H38c-20 0-37-17-37-37V38C1 18 18 1 38 1"
      />
      <Path
        fill="#155196"
        d="M38 20h530c10 0 18 8 18 18v530c0 10-8 18-18 18H38a19 19 0 0 1-13-5 19 19 0 0 1-5-13V38c0-10 8-18 18-18"
      />
      <Path fill="#fff" d="M114 114h378v378H114z" />
      <Path
        stroke="#000"
        strokeLinejoin="round"
        strokeWidth={25}
        d="m375 225 15 150M225 225l-15 150m-15-150h210m30 90H165"
      />
    </Svg>
  );
}
