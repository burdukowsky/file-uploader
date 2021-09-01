import React, {useState} from 'react';

interface ResponseViewerProps {
  data: object;
}

export const ResponseViewer: React.FC<ResponseViewerProps> = ({data}) => {
  const [split, setSplit] = useState<boolean>(false);

  function formatJson(val: any): string {
    return JSON.stringify(val, null, 2);
  }

  return (
    <>
      <label>
        <input type="checkbox" checked={split} onChange={e => setSplit(e.target.checked)}/>
        Split View
      </label>
      {split
        ? (
          <>
            {Object.entries(data).map(([key, value]) => {
              return (
                <div key={key} style={{margin: '2rem 0'}}>
                  Key <code>{key}</code>
                  <pre>{formatJson(value)}</pre>
                </div>
              );
            })}
          </>
        )
        : <pre>{formatJson(data)}</pre>
      }
    </>
  );
}
