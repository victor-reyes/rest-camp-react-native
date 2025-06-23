import { useInView } from "react-intersection-observer";

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export function LazyImage({ src, ...rest }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div
      ref={ref}
      className="bg-blue-300 rounded-xl overflow-hidden w-full h-full flex items-center justify-center">
      {inView ?
        <img {...rest} src={src} />
      : null}
    </div>
  );
}
