import React, { useEffect, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";

export default function ModelComponent(props) {
  const API_URL = process.env.REACT_APP_API_URL;
  const [memberDetails, setMemberDetails] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getMemberDetails = async () => {
      try {
        const response = await axios.get(
          API_URL + "api/users/getuser/" + user._id
        );
        setMemberDetails(response.data);
      } catch (err) {
        console.log("Error in fetching the member details");
      }
    };
    getMemberDetails();
  }, [API_URL, user]);

  useEffect(() => {
    if (memberDetails?.activeTransactions) {
      const updatedNotifications = memberDetails.activeTransactions
        .filter((data) => data.transactionType === "Issued")
        .map((data) => {
          const daysLeft = parseInt(
            (new Date(data.toDate).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          );
          if (daysLeft <= 7 && daysLeft > 0) {
            return `Reminder: ${data.bookName} has ${daysLeft} days left!`;
          } else if (daysLeft <= 0) {
            const fine = Math.abs(daysLeft) * 5;
            return `Overdue: ${data.bookName} is overdue by ${Math.abs(
              daysLeft
            )} days. Fine: ₹${fine}`;
          }
          return null;
        })
        .filter((notification) => notification); // Remove null values
      setNotifications(updatedNotifications);
    }
  }, [memberDetails]);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Fine Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="notifications">
            {notifications.map((note, index) => (
              <p key={index} className="notification-message">
                {note}
              </p>
            ))}
          </div>
          <div className="member-activebooks-content" id="activebooks@member">
            <p className="member-dashboard-heading">Issued</p>
            <table className="activebooks-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Book-Name</th>
                  <th>From Date</th>
                  <th>Days Left</th>
                  <th>Fine</th>
                </tr>
              </thead>
              <tbody>
                {memberDetails?.activeTransactions
                  ?.filter((data) => data.transactionType === "Issued")
                  .map((data, index) => {
                    const daysLeft = parseInt(
                      (new Date(data.toDate).getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    );
                    const fine =
                      daysLeft <= 0 ? Math.abs(daysLeft) * 5 : 0;

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.bookName}</td>
                        <td>
                          {new Date(data.fromDate).toLocaleDateString()}
                        </td>
                        <td>{daysLeft > 0 ? daysLeft : "Overdue"}</td>
                        <td>₹{fine}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
