import { useEffect, useRef, useState } from 'react';
import type { MediaAsset } from '../../assets/media';
import { useInView } from '../../hooks/useInView';

type Props = {
  asset: MediaAsset;
  alt: string;
  className?: string;
  /** Fill the parent instead of keeping the photo's own aspect ratio */
  fill?: boolean;
  priority?: boolean;
};

/**
 * A photograph that starts dark and "switches on" when it scrolls into view.
 * Intrinsic width/height + a tiny blurred placeholder keep the layout stable.
 */
export function LitImage({ asset, alt, className = '', fill = false, priority = false }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const inView = useInView(wrap, { threshold: 0.3 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (img.current?.complete) setLoaded(true);
  }, []);

  return (
    <div
      ref={wrap}
      className={`lit-img ${inView && loaded ? 'is-lit' : ''} ${fill ? 'h-full w-full' : ''} ${className}`}
      style={{ backgroundImage: `url(${asset.lqip})`, aspectRatio: fill ? undefined : `${asset.w} / ${asset.h}` }}
    >
      <img
        ref={img}
        src={asset.src}
        width={asset.w}
        height={asset.h}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
