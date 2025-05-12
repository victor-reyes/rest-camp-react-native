import Svg, { SvgProps, Path } from "react-native-svg";
export function PetrolStation(props: SvgProps) {
  return (
    <Svg {...props} viewBox="0 0 606 606">
      <Path
        fill="#fff"
        d="M38 1h530c20 0 37 17 37 37v530a38 38 0 0 1-11 26 38 38 0 0 1-26 11H38c-20 0-37-17-37-37V38C1 18 18 1 38 1"
      />
      <Path
        fill="#155196"
        d="M38 20h530c10 0 18 8 18 18v530c0 10-8 18-18 18H38a19 19 0 0 1-13-5 19 19 0 0 1-5-13V38c0-10 8-18 18-18"
      />
      <Path fill="#fff" d="M114 492V114h378v378z" />
      <Path
        fill="#231f20"
        d="M253 272h20v194h169V172c0-17-14-31-32-31H305c-17 0-32 14-32 31v2h-29c-31 0-58 21-66 51l-36 134a56 56 0 1 0 111 15z"
      />
      <Path
        fill="#fff"
        d="M170 367a27 27 0 1 0 54 7V256l31-30h18v-25h-29c-17 0-32 12-37 28zm141-134v-59h91v59z"
      />
    </Svg>
  );
}
