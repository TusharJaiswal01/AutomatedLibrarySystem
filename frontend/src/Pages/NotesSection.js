import React, { useState, useEffect } from 'react';

function NotesSection() {
  const [notes, setNotes] = useState([]);
  const [noteData, setNoteData] = useState({
    title: '',
    subjectName: '',
    subjectCode: '',
    file: null,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(10);

  // Fetch notes from localStorage on initial render
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setNoteData({ ...noteData, file: files[0] });
    } else {
      setNoteData({ ...noteData, [name]: value });
    }
  };

  const handleAddNote = () => {
    // Validation before adding a new note
    if (
      noteData.title &&
      noteData.subjectName &&
      noteData.subjectCode &&
      noteData.file
    ) {
      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const newNote = {
          ...noteData,
          file: reader.result, // Store base64 data
          id: Date.now(),
        };
        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
        setNoteData({
          title: '',
          subjectName: '',
          subjectCode: '',
          file: null,
        });
      };
      reader.readAsDataURL(noteData.file); // Read file as base64
    } else {
      alert('Please fill out all fields and upload a note file.');
    }
  };

  const filteredNotes = notes
    .filter((note) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        note.title.toLowerCase().includes(searchTerm) ||
        note.subjectName.toLowerCase().includes(searchTerm) ||
        note.subjectCode.toLowerCase().includes(searchTerm)
      );
    })
    .slice(0, displayCount);
    const handleViewNote = (file) => {
      if (file) {
        // Check if file content is valid and has proper Base64 format
        if (file.startsWith("data:application/pdf;base64,")) {
          const newWindow = window.open();
          if (newWindow) {
            newWindow.document.write(`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <title>View Note</title>
                <style>
                  body {
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                  }
                  iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: none;
                  }
                </style>
              </head>
              <body>
                <iframe src="${file}" frameborder="0" allowfullscreen></iframe>
              </body>
              </html>
            `);
          } else {
            alert("Pop-up blocked! Please allow pop-ups for this website.");
          }
        } else {
          alert("Invalid file format. Only PDF files are supported.");
        }
      } else {
        alert("No file available to view.");
      }
    };
    
  const handleDownloadNote = (file, title) => {
    if (file) {
      const link = document.createElement('a');
      link.href = file;
      link.download = title + '.pdf'; // Set the filename for download
      link.click(); // Trigger the download
    } else {
      alert('No file available to download');
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', padding: '40px', fontFamily: 'Arial, sans-serif', minHeight: '100vh', marginTop:"50px" }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#333', fontWeight: 'bold', marginBottom: '2rem' }}>
        Notes Section
      </h2>

      {/* Layout for About Section and Add Note Form */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '2rem' }}>
        {/* About Section */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ fontSize: '3rem', color: '#555', fontWeight: 'bold' }}>About Notes Section</h3>
          <p style={{ color: '#777', fontSize: '2rem' }}>
          This section allows seniors and knowledgeable individuals to share well-organized study notes, helping others benefit from their expertise.
          </p>
        </div>

        {/* Add New Note Form */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ fontSize: '3rem', color: '#555', fontWeight: 'bold', marginBottom: '1rem' }}>Add New Note</h3>
          <input
            type="text"
            name="title"
            placeholder="Enter Note Title"
            value={noteData.title}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="subjectName"
            placeholder="Enter Subject Name"
            value={noteData.subjectName}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="subjectCode"
            placeholder="Enter Subject Code"
            value={noteData.subjectCode}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <label style={labelStyle}>
            Upload Note File (PDF):
            <input
              type="file"
              name="file"
              accept="application/pdf"
              onChange={handleInputChange}
              style={inputFileStyle}
            />
          </label>
          <button onClick={handleAddNote} style={buttonStyle}>Add Note</button>
        </div>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search notes by title, subject name, or subject code"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: '80%',
          margin: '0 auto',
          display: 'block',
          padding: '10px',
          fontSize: '1rem',
          borderRadius: '5px',
          border: '1px solid #ddd',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      />

      {/* Display Notes Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
          padding: '10px',
        }}
      >
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            style={{
              backgroundColor: '#fff',
              padding: '15px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>{note.title}</h4>
            <p style={{ color: '#777', fontSize: '0.875rem', marginBottom: '2px' }}>Subject: {note.subjectName}</p>
            <p style={{ color: '#777', fontSize: '0.875rem', marginBottom: '10px' }}>Code: {note.subjectCode}</p>

            {/* View and Download Buttons */}
            <button
              onClick={() => handleViewNote(note.file)}
              style={{ ...buttonStyle, backgroundColor: '#2ecc71', marginRight: '10px' }}
            >
              View
            </button>
            <button
              onClick={() => handleDownloadNote(note.file, note.title)}
              style={{ ...buttonStyle, backgroundColor: '#3498db' }}
            >
              Download
            </button>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <button
        onClick={() => setDisplayCount(displayCount + 10)}
        style={{
          display: 'block',
          width: '200px',
          margin: '20px auto',
          padding: '10px 20px',
          fontSize: '1rem',
          backgroundColor: '#3498db',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Load More Notes
      </button>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  fontSize: '1rem',
  borderRadius: '5px',
  border: '1px solid #ddd',
};

const labelStyle = {
  display: 'block',
  marginBottom: '10px',
  fontSize: '1rem',
};

const inputFileStyle = {
  display: 'block',
  marginTop: '5px',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#3498db',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background-color 0.3s',
};

export default NotesSection;
