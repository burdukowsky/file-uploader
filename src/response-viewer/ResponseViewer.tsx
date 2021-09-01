import React, {useState} from 'react';

import {ResponseViewerBody} from './response-viewer-body/ResponseViewerBody';

interface ResponseViewerProps {
  data: object | null;
}

export const ResponseViewer: React.FC<ResponseViewerProps> = ({data}) => {
  const [split, setSplit] = useState<boolean>(false);

  return (
    <>
      <label>
        <input type="checkbox" checked={split} onChange={e => setSplit(e.target.checked)}/>
        Split View
      </label>

      {data == null
        ? null
        : <ResponseViewerBody data={data} split={split}/>}
    </>
  );
};
