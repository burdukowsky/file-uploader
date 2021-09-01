import React, {useState} from 'react';

import styles from './FileUploader.module.css';
import {ResponseViewer} from '../response-viewer/ResponseViewer';

export const FileUploader: React.FC = () => {
  const [url, setUrl] = useState<string>('http://localhost:8090/test');
  const [method, setMethod] = useState<string>('POST');
  const [field, setField] = useState<string>('file');
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<object | null>(null);
  const [unknownError, setUnknownError] = useState<boolean>(false);

  function onSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();

    setResponse(null);
    setUnknownError(false);

    if (file != null) {
      upload();
    }
  }

  async function upload(): Promise<void> {
    const data = new FormData();
    data.append(field, file as Blob);

    try {
      const response = await fetch(url, {method, body: data});
      setResponse(await response.json());
    } catch (error) {
      // @ts-ignore
      if (typeof error.json === 'function') {
        // @ts-ignore
        setResponse(await error.json());
      } else {
        setUnknownError(true);
      }
    }
  }

  return (
    <>
      <h3>Form</h3>
      <form className={styles.fileUploaderForm} onSubmit={onSubmit}>
        <label>
          URL <br/>
          <input type='text' value={url} onChange={e => setUrl(e.target.value)} required={true}/>
        </label>
        <label>
          Method <br/>
          <input type='text' value={method} onChange={e => setMethod(e.target.value)} required={true}/>
        </label>
        <label>
          Field Name <br/>
          <input type='text' value={field} onChange={e => setField(e.target.value)} required={true}/>
        </label>
        <label>
          File <br/>
          <input type='file' onChange={e => e.target.files && setFile(e.target.files[0])} required={true}/>
        </label>
        <button type='submit'>Send</button>
      </form>
      {unknownError && <p className={styles.error}>Unknown Error</p>}

      <hr/>

      <h3>Response</h3>
      <ResponseViewer data={response}/>
    </>
  );
};
