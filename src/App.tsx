import React from 'react';

import styles from './App.module.css';
import {FileUploader} from './file-uploader/FileUploader';

function App() {
  return (
    <div className={styles.appContainer}>
      <FileUploader/>
    </div>
  );
}

export default App;
