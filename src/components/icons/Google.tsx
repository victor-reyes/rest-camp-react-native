import { memo } from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const GoogleSvg = (props: SvgProps) => (
  <Svg {...props} preserveAspectRatio="xMidYMid" viewBox="-3 0 262 262">
    <Path
      fill="#4285F4"
      d="M256 133c0-10-1-18-3-26H131v48h71c-1 12-9 30-26 43v1l38 30h3c25-22 39-56 39-96"
    />
    <Path
      fill="#34A853"
      d="M131 261c35 0 64-12 86-32l-41-31a80 80 0 0 1-120-42l-1 1-41 31v1c21 43 65 72 117 72"
    />
    <Path fill="#FBBC05" d="M56 156a80 80 0 0 1 0-51v-2L15 71l-1 1a131 131 0 0 0 0 117l42-33" />
    <Path
      fill="#EB4335"
      d="M131 50c24 0 41 11 50 20l37-36A130 130 0 0 0 14 72l42 33c11-32 40-55 75-55"
    />
  </Svg>
);

export const GoogleIcon = memo(GoogleSvg);
