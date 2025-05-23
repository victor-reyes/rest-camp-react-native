import Svg, { SvgProps, Path, Circle } from "react-native-svg";
export function Playground(props: SvgProps) {
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
      <Path fillRule="evenodd" d="m177 363 264-97 7 18-265 96Z" />
      <Path fillRule="evenodd" d="m293 324 37-6v112h-37Z" />
      <Circle cx={219.5} cy={283.7} r={21.3} fillRule="evenodd" />
      <Circle cx={368.9} cy={203.1} r={21.3} fillRule="evenodd" />
      <Path d="M179 341a28 28 0 0 0-4 11 28 28 0 0 0 2 15c5 12 17 18 25 28 7 7 12 19 22 23a14 14 0 0 0 9 0c2 0 4-2 6-4a9 9 0 0 0 0-6c-1-5-5-8-8-11-8-11-21-19-27-32a14 14 0 0 1-1-7c2-8 3-20 11-21 6-1 8 10 13 13a57 57 0 0 0 17 9c7 2 14 4 21 3a14 14 0 0 0 8-4 9 9 0 0 0 3-6 7 7 0 0 0-3-5c-4-4-11-2-16-4l-19-11-12-8c-3-2-5-6-9-7a21 21 0 0 0-15 0c-10 4-17 15-23 24m226-29c-4 8 2 18-1 26a10 10 0 0 1-4 5 16 16 0 0 1-13 2 11 11 0 0 1-5-6c-2-4-1-8-1-13 0-7-2-15 1-21a45 45 0 0 1 14-16c7-5 18-5 21-12 1-3-3-7-4-10-2-3-4-7-7-9-2-2-5-5-7-4-4 1-4 7-5 11-2 3-1 7-3 10a71 71 0 0 1-17 23 28 28 0 0 1-9 5c-4 1-9 5-11 1-6-7 9-16 13-25l7-19c1-6 0-13 3-19a23 23 0 0 1 10-10c4-2 9-1 13-1a36 36 0 0 1 14 3c5 3 8 7 12 11l8 14 5 11c2 6 3 14 0 20-3 7-10 10-17 14l-12 5z" />
    </Svg>
  );
}
