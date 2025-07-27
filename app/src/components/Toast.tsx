import {
  BaseToastProps,
  ErrorToast,
  InfoToast,
  SuccessToast,
  ToastConfig,
  ToastConfigParams,
  ToastProps,
  ToastShowParams,
} from "react-native-toast-message";
import ToastBase from "react-native-toast-message";
import { Button } from "./Button";
import { useCallback, useMemo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

type ButtonToastProps = BaseToastProps & { buttonTitle?: string };
type BaseShowParams = ToastShowParams & { buttonTitle?: string };

Toast.show = ({ buttonTitle, ...params }: BaseShowParams) => {
  const props: ToastShowParams = { ...params.props, buttonTitle };
  ToastBase.show({ ...params, props });
};
Toast.hide = (params?: void) => ToastBase.hide(params);

type Props = ToastProps & { buttonTitle?: string };

export function Toast(props: Props) {
  const config = { ...props.config, ...toastConfig };
  return <ToastBase {...props} position={props.position || "bottom"} config={config} />;
}

function MyToast({
  type,
  props,
  onPress,
  ...rest
}: ToastConfigParams<ButtonToastProps> & { type: "success" | "error" | "info" }) {
  const handlePress = useCallback(() => onPress?.(), [onPress]);

  const contentContainerStyle: StyleProp<ViewStyle> = useMemo(() => {
    const containerStyle: StyleProp<ViewStyle> = { flex: 1 };

    if (props.buttonTitle) containerStyle.paddingHorizontal = 16;

    return [props.contentContainerStyle, containerStyle];
  }, [props.buttonTitle, props.contentContainerStyle]);

  const params = {
    ...rest,
    props,
    contentContainerStyle,
    text2NumberOfLines: props.buttonTitle ? 2 : 1,
    onPress: handlePress,
    renderTrailingIcon: () => <ToastButton title={props.buttonTitle} onPress={handlePress} />,
  };
  switch (type) {
    case "success":
      return <SuccessToast {...params} />;
    case "error":
      return <ErrorToast {...params} />;
    case "info":
      return <InfoToast {...params} />;
  }
}

function ToastButton({ title, onPress }: { title?: string; onPress?: () => void }) {
  return <Button fit title={title} onPress={onPress} textColor="#155196" style={styles.button} />;
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 0,
    maxWidth: 120,
    padding: 0,
    margin: 0,
    paddingLeft: 0,
    paddingRight: 8,
  },
});

const toastConfig: ToastConfig = {
  success: (params: ToastConfigParams<ButtonToastProps>) => <MyToast {...params} type="success" />,
  error: (params: ToastConfigParams<ButtonToastProps>) => <MyToast {...params} type="error" />,
  info: (params: ToastConfigParams<ButtonToastProps>) => <MyToast {...params} type="info" />,
};
