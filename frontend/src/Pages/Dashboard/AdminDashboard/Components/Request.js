import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Request.css'; // Import the CSS file

const Request = () => {
  const [requests, setRequests] = useState([]);

  const API_URL = 'http://localhost:5000/'

  // Fetch all requests
  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/request/getAllRequest');
      setRequests(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  // Accept request handler
  const handleAccept = async (data) => {
    try {

      const transactionData = {
        "bookId": data.bookId._id,
        "borrowerId": data.userId._id,
        "borrowerName": data.userId.userFullName,
        "bookName": data.bookId.bookName,
        "transactionType": "Issued",
        "fromDate": new Date(),
        "toDate": "12/18/2024",
        "isAdmin": true
      }
      const response = await axios.post(API_URL + "api/transactions/add-transaction", transactionData)

      await axios.put(API_URL + `api/users/${response.data._id}/move-to-activetransactions`, {
        userId: data.userId._id,
        isAdmin: true
      })

      await axios.put(API_URL + "api/books/updatebook/" + data.bookId._id, {
        isAdmin: true,
        availableCount: data.bookId.availableCount - 1
      })

      await handleDelete(data._id)


    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  // Delete request handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/request/delete/${id}`);
      setRequests(requests.filter((request) => request._id !== id)); // Remove from UI after deletion
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="request-container">
      <h1 className="request-title">Book Requests</h1>
      <div className="request-grid">
        {requests.map((request) => (
          <div key={request._id} className="request-card">
            <p className="request-book">Book: {request.bookId?.bookName || 'Unknown Book'}</p>
            <p className="request-author">Author: {request.bookId?.author || 'Unknown Author'}</p>
            <p className="request-user">User: {request.userId?.userFullName || 'Unknown User'}</p>
            <p className="request-status">Status: {request.status || 'Pending'}</p>

            <div className="request-buttons">
              <button
                onClick={() => handleAccept(request)}
                className="button accept-button"
              >
                Accept Request
              </button>
              <button
                onClick={() => handleDelete(request._id)}
                className="button delete-button"
              >
                Delete Request
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Request;
