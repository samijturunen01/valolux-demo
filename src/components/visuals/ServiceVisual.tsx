import type { JSX } from 'react';
import type { VisualKey } from '../../content/services';
import { LightboxVisual } from './LightboxVisual';
import { LedMatrixVisual } from './LedMatrixVisual';
import { NeonVisual } from './NeonVisual';
import { PylonVisual } from './PylonVisual';
import { FilmVisual } from './FilmVisual';
import { TubeVisual } from './TubeVisual';
import '../../styles/visuals.css';

const map = {
  lightbox: LightboxVisual,
  led: LedMatrixVisual,
  neon: NeonVisual,
  pylon: PylonVisual,
  film: FilmVisual,
  tube: TubeVisual,
} satisfies Record<VisualKey, (p: { lit: boolean }) => JSX.Element>;

/** Illustrative visual for a service. These are drawings, not photographs of client work. */
export function ServiceVisual({ kind, lit }: { kind: VisualKey; lit: boolean }) {
  const V = map[kind];
  return <V lit={lit} />;
}
