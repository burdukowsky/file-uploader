import React from 'react';

import styles from './ResponseViewerBody.module.css';

interface ResponseViewerBodyProps {
  data: object;
  split?: boolean;
}

export const ResponseViewerBody: React.FC<ResponseViewerBodyProps> = ({data, split = false}) => {

  function formatJson(val: any): string {
    return JSON.stringify(val, null, 2);
  }

  return split
    ? (
      <>
        {Object.entries(data).map(([key, value]) => {
          return (
            <div key={key} className={styles.entry}>
              Key <code>{key}</code>
              <pre>{formatJson(value)}</pre>
            </div>
          );
        })}
      </>
    )
    : <pre>{formatJson(data)}</pre>;
};
