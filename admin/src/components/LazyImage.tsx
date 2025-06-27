import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export function LazyImage({ src, ...rest }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref}>
      {inView ?
        <img
          {...rest}
          src={src}
          className={cn("w-full h-auto bg-blue-300 object-contain", rest.className)}
        />
      : null}
    </div>
  );
}
