import Svg, { SvgProps, Path, Text, G } from "react-native-svg";
export function HWC(props: SvgProps) {
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
      <Text
        x={480}
        y={200}
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize={100}
        fontWeight="bold"
        textAnchor="end">
        {"WC"}
      </Text>
      <G fillRule="evenodd" clipRule="evenodd">
        <Path d="M260 206c13-1 24-13 24-26a27 27 0 0 0-54 0c0 4 2 9 4 13l9 134h98l41 94 52-21-8-19-29 11-39-90h-92l-1-17h66v-25h-68z" />
        <Path d="M358 399a99 99 0 0 1-187-44c1-39 24-74 58-90l2 29a72 72 0 0 0 39 132c36 0 67-28 71-63z" />
      </G>
    </Svg>
  );
}
