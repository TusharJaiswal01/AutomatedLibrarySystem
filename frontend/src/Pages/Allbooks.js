import React, { useEffect, useState } from "react";

function Allbooks() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("all");
  const [selectedBook, setSelectedBook] = useState(null);

  // Fetch books from backend API
  useEffect(() => {
    fetch("http://localhost:5000/api/books/allbooks")
      .then((response) => response.json())
      .then((data) => setBooks(data))
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
        return book.semester && book.semester.toString().toLowerCase().includes(searchLower);
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
          (book.edition && book.edition.toString().toLowerCase().includes(searchLower)) ||
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
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchBar}
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
      </div>

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
    background: "linear-gradient(to right, #e0eafc, #cfdef3)", // Gradient background
    minHeight: "100vh",
  },
  searchRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    marginTop:"100px"
  },
  searchBar: {
    padding: "10px",
    width: "60%", // Smaller width for search bar
    marginRight: "10px", // Add margin to separate from dropdown
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  },
  filterDropdown: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    cursor: "pointer",
  },
  booksContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "25px",
    maxWidth: "1200px",
    width: "100%",
  },
  bookCard: {
    backgroundColor: "#fff",
    padding: "18px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    overflow: "hidden",
  },
  bookTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  label: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#555",
  },
  issueButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
  closeButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "400px",
    textAlign: "center",
  },
  modalTitle: {
    fontSize: "24px",
    marginBottom: "20px",
  },
};

export default Allbooks;
