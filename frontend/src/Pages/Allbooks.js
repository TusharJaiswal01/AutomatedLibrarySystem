import React, { useEffect, useState } from "react";

function Allbooks() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("all");
  const [selectedBook, setSelectedBook] = useState(null);
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [semesterOptions, setSemesterOptions] = useState([]);

  // Fetch books from backend API
  useEffect(() => {
    fetch("http://localhost:5000/api/books/allbooks")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        const uniqueSemesters = [...new Set(data.map(book => book.semester))];
        setSemesterOptions(uniqueSemesters);
      })
      .catch((error) => console.log("Error fetching books:", error));
  }, []);

  const setRequest = async (book) => {
    const userId = JSON.parse(localStorage.getItem("user"));

    if (book.availableCount <= 0) {
      const res = await fetch("http://localhost:5000/api/queue/addToQueue", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: book._id,
          userId: userId._id,
        }),
      });

      const data = await res.json();
      alert("Book not available, request has been added to queue");
      return;
    }

    const res = await fetch("http://localhost:5000/api/request/postNewRequest", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId: book._id,
        userId: userId._id,
      }),
    });
    const data = await res.json();
    console.log({ data });
  };

  const handleBookClick = (book) => {
    setSelectedBook(book); // Set the selected book for modal
  };

  const closeModal = () => {
    setSelectedBook(null); // Close the modal
  };

  const handleFilterChange = (e) => {
    setSelectedField(e.target.value);
    setSearchTerm("");
    setAutocompleteOptions([]);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value && selectedField !== "semester") {
      const filteredSuggestions = books
        .filter(book => {
          const fieldValue = book[selectedField]?.toString().toLowerCase();
          return fieldValue && fieldValue.includes(value.toLowerCase());
        })
        .map(book => book[selectedField]);

      setAutocompleteOptions([...new Set(filteredSuggestions)]);
    } else {
      setAutocompleteOptions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setAutocompleteOptions([]);
  };

  const filteredBooks = books.filter((book) => {
    const searchLower = searchTerm.toLowerCase();

    // Apply filter based on selected field
    switch (selectedField) {
      case "bookName":
        return book.bookName && book.bookName.toLowerCase().includes(searchLower);
      case "author":
        return book.author && book.author.toLowerCase().includes(searchLower);
      case "subjectCode":
        return book.subjectCode && book.subjectCode.toLowerCase().includes(searchLower);
      case "semester":
        return book.semester && book.semester.toString().toLowerCase() === searchLower;
      case "department":
        return book.department && book.department.toLowerCase().includes(searchLower);
      case "language":
        return book.language && book.language.toLowerCase().includes(searchLower);
      case "publisher":
        return book.publisher && book.publisher.toLowerCase().includes(searchLower);
      default:
        return (
          (book.bookName && book.bookName.toLowerCase().includes(searchLower)) ||
          (book.author && book.author.toLowerCase().includes(searchLower)) ||
          (book.subjectCode && book.subjectCode.toLowerCase().includes(searchLower)) ||
          (book.semester && book.semester.toString().toLowerCase().includes(searchLower)) ||
          (book.department && book.department.toLowerCase().includes(searchLower)) ||
          (book.language && book.language.toLowerCase().includes(searchLower)) ||
          (book.publisher && book.publisher.toLowerCase().includes(searchLower))
        );
    }
  });

  return (
    <div style={styles.booksPage}>
      {/* Search Bar and Dropdown in same row */}
      <div style={styles.searchRow}>
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={styles.searchBar}
          disabled={selectedField === "semester"}
        />

        {/* Dropdown for selecting search field */}
        <select
          value={selectedField}
          onChange={handleFilterChange}
          style={styles.filterDropdown}
        >
          <option value="all">Search Books By</option>
          <option value="bookName">Book Name</option>
          <option value="author">Author</option>
          <option value="subjectCode">Subject Code</option>
          <option value="semester">Semester</option>
          <option value="department">Department</option>
          <option value="language">Language</option>
          <option value="publisher">Publisher</option>
        </select>

        {/* Semester Dropdown */}
        {selectedField === "semester" && (
          <select
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.semesterDropdown}
          >
            <option value="">Select Semester</option>
            {semesterOptions.map((semester) => (
              <option key={semester} value={semester}>
                {semester}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Autocomplete Suggestions */}
      {autocompleteOptions.length > 0 && (
        <div style={styles.autocompleteContainer}>
          {autocompleteOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(option)}
              style={styles.autocompleteOption}
            >
              {option}
            </div>
          ))}
        </div>
      )}

      <div style={styles.booksContainer}>
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            style={styles.bookCard}
            onClick={() => handleBookClick(book)}
          >
            <p style={styles.bookTitle}>{book.bookName}</p>
            <p>
              <span style={styles.label}>Author:</span> {book.author}
            </p>
            <p>
              <span style={styles.label}>Subject Code:</span> {book.subjectCode}
            </p>
          </div>
        ))}
      </div>

      {/* Modal for displaying book details */}
      {selectedBook && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>{selectedBook.bookName}</h2>
            <p>
              <span style={styles.label}>Author:</span> {selectedBook.author}
            </p>
            <p>
              <span style={styles.label}>Subject Code:</span> {selectedBook.subjectCode}
            </p>
            <p>
              <span style={styles.label}>Edition:</span> {selectedBook.edition}
            </p>
            <p>
              <span style={styles.label}>Language:</span> {selectedBook.language}
            </p>
            <p>
              <span style={styles.label}>Publisher:</span> {selectedBook.publisher}
            </p>
            <p>
              <span style={styles.label}>Status:</span> {selectedBook.bookStatus}
            </p>
            <p>
              <span style={styles.label}>Semester:</span> {selectedBook.semester}
            </p>
            <p>
              <span style={styles.label}>Available Count:</span> {selectedBook.availableCount}
            </p>
            <p>
              <span style={styles.label}>Department:</span> {selectedBook.department}
            </p>
            <button
              onClick={() => {
                setRequest(selectedBook);
                closeModal();
              }}
              style={styles.issueButton}
            >
              Issue Book
            </button>
            <button onClick={closeModal} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Updated styles
const styles = {
  booksPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    background: "linear-gradient(to right, #e0eafc, #cfdef3)",
    minHeight: "100vh",
  },
  searchRow: {
    
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    gap: "10px",
  },
  searchBar: {
    marginTop:"80px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "500px",
  },
  filterDropdown: {
    marginTop:"80px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  semesterDropdown: {
    marginTop:"80px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  autocompleteContainer: {
    // marginTop:"80px",
    position: "absolute",
    width: "300px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    borderRadius: "4px",
    maxHeight: "150px",
    overflowY: "auto",
    marginTop: "80px",
  },
  autocompleteOption: {
    
    padding: "10px",
    cursor: "pointer",
  },
  booksContainer: {
    width:"100%",
    marginTop:"50px",
    display: "grid",
    

    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  bookCard: {
    background: "#fff",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transition: "transform 0.2s",
    minHeight : "130px",
  },
  bookCardHover: {
    transform: "scale(1.05)",
  },
  bookTitle: {
    fontWeight: "bold",
    fontSize: "1.1em",
    marginBottom: "10px",
  },
  label: {
    fontWeight: "bold",
  },
  modalOverlay: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    background: "#fff",
    borderRadius: "8px",
    padding: "20px",
    width: "500px",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  modalTitle: {
    fontSize: "1.5em",
    marginBottom: "10px",
  },
  issueButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  closeButton: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "10px",
  },
};

export default Allbooks;
