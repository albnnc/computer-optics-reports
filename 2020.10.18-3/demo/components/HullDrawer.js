import { css } from 'emotion';
import React from 'react';

const wrapClassName = css`
  display: inline-block;
  position: relative;
`;

const hullClassName = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
`;

export const HullDrawer = ({
  img: { src, width, height },
  hull: {
    hull,
    centroid: [cx, cy],
    transform,
  },
}) => {
  const points = [...hull];
  const first = points.shift();
  points.push(first);

  const path = points.reduce(
    (prev, [x, y]) => `${prev} L ${x} ${y}`,
    `M${first[0]} ${first[1]}`
  );

  return (
    <div className={wrapClassName}>
      <img src={src} />
      <div
        className={hullClassName}
        style={{ transform, transformOrigin: `${cx}px ${cy}px` }}
      >
        <svg viewBox={`0 0 ${width} ${height}`}>
          <path d={path} fill="transparent" stroke="red" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};
