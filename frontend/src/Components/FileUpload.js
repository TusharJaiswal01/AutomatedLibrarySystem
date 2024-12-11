import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null); 
  const [message, setMessage] = useState(''); 
  const [uploading, setUploading] = useState(false); 
// file line changes
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    
    if (selectedFile && (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || selectedFile.type === 'application/vnd.ms-excel')) {
      setFile(selectedFile);
      setMessage(''); 
    } else {
      setFile(null);
      setMessage('Please upload a valid Excel file (.xlsx or .xls)');
    }
  };

  
  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true); 

      
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
         
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setMessage(`Uploading: ${percentCompleted}%`);
        },
      });

      setMessage(res.data); 
    } catch (err) {
      console.error(err);
      setMessage('File upload failed! Please try again.');
    } finally {
      setUploading(false); 
      setFile(null); 
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Upload Excel File</h2>
      <form onSubmit={handleFileUpload}>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          style={{ marginBottom: '10px' }}
        />
        <button type="submit" disabled={uploading} style={{ marginBottom: '10px' }}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default FileUpload;
