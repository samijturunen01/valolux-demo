import { useId } from 'react';
import { LOGO_H, LOGO_LETTERS, LOGO_W } from './logoPaths';
import { Starburst } from './Starburst';
import '../../styles/sign.css';

/** Padding around the letters inside every layer, so strokes and depth are not clipped. */
export const SIGN_PAD = 10;
export const SIGN_VB = `${-SIGN_PAD} ${-SIGN_PAD} ${LOGO_W + SIGN_PAD * 2} ${LOGO_H + SIGN_PAD * 2 + 6}`;

/** Horizontal centre of each letter as a fraction of the sign width (drives the ignition order). */
export const letterCenters = LOGO_LETTERS.map((l) => (l.box[0] + l.box[2] / 2 + SIGN_PAD) / (LOGO_W + SIGN_PAD * 2));

/**
 * The hero sign, built like a real channel-letter sign:
 *  1. halo   – light thrown on the wall behind the letters (blurred, additive)
 *  2. body   – depth/returns, dark unlit faces with a rim, lit acrylic faces,
 *              a white-hot ignition layer and a specular sheen
 *  3. bloom  – soft light bleeding off the lit faces
 *  4. spark  – the "current" that travels through the sign while it powers up
 *  5. reflection – faint mirror image on the glossy surface below
 *
 * Every layer renders in its final, lit state; the Hero timeline switches them
 * off before first paint and animates them on (reduced motion: no animation).
 */
export function IlluminatedSign({ className = '' }: { className?: string }) {
  const id = useId();
  const paths = (extra?: (i: number) => Record<string, unknown>) =>
    LOGO_LETTERS.map((l, i) => <path key={l.id} d={l.d} fillRule="evenodd" {...(extra ? extra(i) : null)} />);

  return (
    <div className={`sign ${className}`} role="img" aria-label="Valomainospalvelu Valolux">
      <div className="sign-tilt" data-sign-tilt>
        <div className="sign-halo-wrap">
          <svg className="sign-layer sign-halo" viewBox={SIGN_VB} aria-hidden="true" data-sign-halo>
            <g fill="#ff9d33">{paths()}</g>
          </svg>
        </div>

        <svg className="sign-layer sign-body" viewBox={SIGN_VB} aria-hidden="true">
          <defs>
            <linearGradient id={`${id}u`} x1="0" y1="0" x2="0" y2={LOGO_H} gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#1d1f26" />
              <stop offset="1" stopColor="#0b0c0f" />
            </linearGradient>
            <linearGradient id={`${id}r`} x1="0" y1="0" x2="0" y2={LOGO_H} gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#5a5f6b" />
              <stop offset="0.5" stopColor="#262930" />
              <stop offset="1" stopColor="#131418" />
            </linearGradient>
            <linearGradient id={`${id}l`} x1="0" y1="0" x2="0" y2={LOGO_H} gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#fffbf2" />
              <stop offset="0.3" stopColor="#ffecc2" />
              <stop offset="0.7" stopColor="#f5cc80" />
              <stop offset="1" stopColor="#e0a14a" />
            </linearGradient>
            <linearGradient id={`${id}s`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#fff" stopOpacity="0.75" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <clipPath id={`${id}c`}>{paths()}</clipPath>
          </defs>

          {/* returns: the sides of the letter bodies, seen slightly from above */}
          <g fill="#020203" transform="translate(0 6)">
            {paths()}
          </g>
          <g fill="#0a0b0e" transform="translate(0 3)">
            {paths()}
          </g>
          {/* unlit acrylic faces with a cool rim catching stray ambient light */}
          <g fill={`url(#${id}u)`} stroke={`url(#${id}r)`} strokeWidth="1.4">
            {paths()}
          </g>
          {/* lit faces, one per letter so they can ignite individually */}
          <g fill={`url(#${id}l)`} stroke="#fff6df" strokeWidth="1" strokeOpacity="0.7">
            {paths((i) => ({ 'data-lit': i }))}
          </g>
          {/* white-hot first light that cools to warm gold */}
          <g fill="#ffffff">{paths((i) => ({ 'data-hot': i, opacity: 0 }))}</g>
          {/* specular sheen travelling across the faces */}
          <g clipPath={`url(#${id}c)`}>
            <rect data-sheen x="-320" y="-40" width="220" height={LOGO_H + 80} fill={`url(#${id}s)`} opacity="0" transform="skewX(-16)" />
          </g>
        </svg>

        <svg className="sign-layer sign-bloom" viewBox={SIGN_VB} aria-hidden="true">
          <g fill="#ffdc9c">{paths((i) => ({ 'data-bloom': i }))}</g>
        </svg>

        <div className="sign-spark" data-sign-spark aria-hidden="true">
          <Starburst />
        </div>
      </div>

      <div className="sign-reflection" aria-hidden="true" data-sign-reflection>
        <svg className="sign-layer" viewBox={SIGN_VB}>
          <g fill="#f3c879">{paths()}</g>
        </svg>
      </div>
    </div>
  );
}
