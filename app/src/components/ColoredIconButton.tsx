import { StyleProp, ViewStyle } from "react-native";
import { Button } from "./Button";
import { useMemo, memo, ReactElement } from "react";

interface Props {
  title: string;
  style?: StyleProp<ViewStyle>;
  iconSize?: number;
  renderIcon: (color: string, size: number) => ReactElement;
  onPress: () => void;
  color?: string;
  alpha?: number;
  disabled?: boolean;
}

function ColoredIconButtonComponent({
  title,
  style,
  iconSize = 24,
  renderIcon,
  onPress,
  disabled = false,
  color = "#155196",
  alpha = 0.22,
}: Props) {
  const buttonStyle: StyleProp<ViewStyle> = useMemo(
    () => [
      {
        backgroundColor: `${color}${Math.round(alpha * 255).toString(16)}`,
        borderWidth: 0,
        borderColor: color,
      },
      style,
    ],
    [style, color, alpha],
  );
  return (
    <Button
      title={title}
      fit
      disabled={disabled}
      style={buttonStyle}
      textColor={color}
      iconSize={iconSize}
      icon={renderIcon(color, iconSize)}
      onPress={onPress}
    />
  );
}

export const ColoredIconButton = memo(ColoredIconButtonComponent);
