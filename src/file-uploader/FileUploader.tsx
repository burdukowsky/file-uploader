import React, {useState} from 'react';

import styles from './FileUploader.module.css';

export const FileUploader: React.FC = () => {
  const [url, setUrl] = useState<string>('http://localhost:8080/upload');
  const [method, setMethod] = useState<string>('POST');
  const [field, setField] = useState<string>('file');
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<string>('');

  function onSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();
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
        setResponse('Unknown Error');
      }
    }
  }

  return (
    <>
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
      {response && (
        <>
          <p>Response</p>
          <pre>{response}</pre>
        </>
      )}
    </>
  );
};
