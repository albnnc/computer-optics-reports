import React from 'react';
import { css } from 'emotion';

const containerClassName = css`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
`;

export const Container = ({ children }) => {
  return <div className={containerClassName}>{children}</div>;
};
