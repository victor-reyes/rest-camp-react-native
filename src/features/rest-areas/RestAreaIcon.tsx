import Svg, { SvgProps, Path } from "react-native-svg";
export function RestAreaIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" width={24} height={24} {...props}>
      <Path
        fill="#fff"
        d="M1.5.04h21c.79 0 1.46.67 1.46 1.47v20.98a1.5 1.5 0 0 1-1.47 1.47H1.51A1.49 1.49 0 0 1 .03 22.5v-21A1.5 1.5 0 0 1 1.5.04"
      />
      <Path
        fill="#155196"
        d="M1.5.8h21a.71.71 0 0 1 .7.7v21a.71.71 0 0 1-.7.7h-21a.75.75 0 0 1-.7-.7v-21a.71.71 0 0 1 .7-.7"
      />
      <Path fill="#fff" d="M4.51 19.48V4.52H19.5v14.97z" />
      <Path
        fill="#231f20"
        d="M6.93 15.53h-1.5v-1.07h4.23v1.06H8.32v1.51h4.63v-3.72H9.23l2.22-2.22h-.95l2.21-2.22h-.95l1.87-3.2 1.82 3.2h-1l2.23 2.22h-.95l2.21 2.22h-3.76v3.72h3.68v1.15H5.43v-1.15h1.5z"
      />
    </Svg>
  );
}
