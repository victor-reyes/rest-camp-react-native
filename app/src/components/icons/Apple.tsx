import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
function AppleComponent(props: SvgProps) {
  return (
    <Svg viewBox="-1.5 0 20 20" {...props}>
      <Path d="M11.57 3.2A4.28 4.28 0 0 0 12.66 0a4.75 4.75 0 0 0-3.08 1.51 4.08 4.08 0 0 0-1.1 3.1 3.94 3.94 0 0 0 3.1-1.42m2.62 7.43a4.45 4.45 0 0 0 2.8 4.05c-.02.07-.44 1.44-1.44 2.85-.87 1.21-1.78 2.43-3.2 2.45-1.4.03-1.85-.79-3.45-.79s-2.1.77-3.42.82c-1.37.05-2.42-1.32-3.3-2.53C.4 14.98-.96 10.45.88 7.39a5.15 5.15 0 0 1 4.32-2.5c1.35-.03 2.63.86 3.45.86s2.37-1.07 4-.91a4.9 4.9 0 0 1 3.81 1.98c-.1.06-2.28 1.27-2.25 3.8" />
    </Svg>
  );
}
export const Apple = React.memo(AppleComponent);
