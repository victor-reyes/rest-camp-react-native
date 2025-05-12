import Svg, { SvgProps, Path } from "react-native-svg";
export function Info(props: SvgProps) {
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
        fill="#231f20"
        d="M360 202a57 57 0 1 0-114 0 57 57 0 0 0 114 0m22 232h9v14H215v-14h9c6 0 12-2 16-6a23 23 0 0 0 6-16V307c0-6-2-11-6-16a23 23 0 0 0-16-6h-8v-13h144v140c0 6 2 12 6 16a23 23 0 0 0 16 6"
      />
    </Svg>
  );
}
