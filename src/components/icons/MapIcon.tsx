import Svg, { SvgProps, Path, Circle } from "react-native-svg";
export function MapIcon(props: SvgProps) {
  return (
    <Svg {...props} viewBox="0 0 30.7 30.7">
      <Path fill="#FFECB3" d="m19.2 6.4-7.7-2.6-7.7 2.6v20.5l7.7-2.6 7.7 2.6 7.7-2.6V3.8z" />
      <Path fill="#FFE082" d="M11.5 3.8v20.5l7.7 2.6V6.4z" />
      <Path
        fill="#F44336"
        d="M19.2 9.6c-2.5 0-4.5 2.1-4.5 4.7s4.5 8.7 4.5 8.7 4.5-6.1 4.5-8.7-2-4.7-4.5-4.7"
      />
      <Circle cx={19.2} cy={14.1} r={1.9} fill="#FFEBEE" />
    </Svg>
  );
}
