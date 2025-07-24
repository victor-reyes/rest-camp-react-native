import { memo } from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";

interface Props extends SvgProps {
  numberOfRestAreas?: number;
  width: number;
  height: number;
}

function RestAreaIconConponent({
  numberOfRestAreas,
  width = 24,
  height = 24,
  style,
  ...props
}: Props) {
  const color = props.color || "#155196";
  return (
    <View style={[{ width: width * 1.12, height: height * 1.12 }, style]}>
      <Svg
        viewBox="0 0 24 24"
        style={{ position: "absolute", bottom: 0, left: 0 }}
        width={width}
        height={height}
        {...props}>
        <Path
          fill="#fff"
          d="M1.5.04h21c.79 0 1.46.67 1.46 1.47v20.98a1.5 1.5 0 0 1-1.47 1.47H1.51A1.49 1.49 0 0 1 .03 22.5v-21A1.5 1.5 0 0 1 1.5.04"
        />
        <Path
          fill={color}
          d="M1.5.8h21a.71.71 0 0 1 .7.7v21a.71.71 0 0 1-.7.7h-21a.75.75 0 0 1-.7-.7v-21a.71.71 0 0 1 .7-.7"
        />
        <Path fill="#fff" d="M4.51 19.48V4.52H19.5v14.97z" />
        <Path
          fill="#231f20"
          d="M6.93 15.53h-1.5v-1.07h4.23v1.06H8.32v1.51h4.63v-3.72H9.23l2.22-2.22h-.95l2.21-2.22h-.95l1.87-3.2 1.82 3.2h-1l2.23 2.22h-.95l2.21 2.22h-3.76v3.72h3.68v1.15H5.43v-1.15h1.5z"
        />
      </Svg>
      {numberOfRestAreas && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{numberOfRestAreas}</Text>
        </View>
      )}
    </View>
  );
}

export const RestAreaIcon = memo(RestAreaIconConponent);

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    backgroundColor: "#ffffffee",
    borderRadius: 25,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
    zIndex: 10,
    top: 0,
    right: 0,
  },
  badgeText: {
    color: "#155196",
    fontSize: 8,
    fontWeight: "bold",
  },
});
