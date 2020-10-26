import { injectGlobal, css } from 'emotion';
import React, { useState } from 'react';
import beforeSrc from 'url:~/assets/before.png';
import afterSrc from 'url:~/assets/after.png';
import result from '~/dist/result.json';
import { Container } from './Container';
import { HullDrawer } from './HullDrawer';

injectGlobal`
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    color: #282828;
    font-family: Roboto, sans-serif;
  }

  img {
    vertical-align: middle;
  }
`;

const rowClassName = css`
  display: flex;
  margin: -0.5rem;

  & > * {
    margin: 0.5rem;
  }
`;

const togglerClassName = css`
  display: block;
  margin: 1rem 0;
`;

export const App = () => {
  const [transform, setTransform] = useState();
  const {
    before,
    after,
    transform: { translate, rotate },
  } = result;
  return (
    <Container>
      <div className={rowClassName}>
        <div>
          <h4>Before</h4>
          <HullDrawer
            img={{ src: beforeSrc, width: 128, height: 128 }}
            hull={{ ...before, transform }}
          />
        </div>
        <div>
          <h4>After</h4>
          <HullDrawer
            img={{ src: afterSrc, width: 128, height: 128 }}
            hull={{ ...before, transform }}
          />
        </div>
      </div>
      <button
        className={togglerClassName}
        onClick={() => {
          setTransform(
            transform
              ? undefined
              : `translate(${translate[0]}px, ${translate[1]}px) rotate(${rotate}rad)`
          );
        }}
      >
        Toggle
      </button>
      <div>
        <strong>Translation:</strong> {translate[0].toFixed(2)} px,{' '}
        {translate[1].toFixed(2)} px
      </div>
      <div>
        <strong>Rotation:</strong> {rotate.toFixed(2)} rad
      </div>
    </Container>
  );
};
