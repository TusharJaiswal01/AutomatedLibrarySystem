import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportGeneration = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const departments = ['CSE', 'CSIT', 'AIML', 'IT', 'DS', 'Cyber Security', 'RL'];

  // Generate mock student data with random fines for each department
  // const generateMockData = () => {
  //   const mockData = [];
  //   departments.forEach((dept) => {
  //     for (let i = 0; i < 25; i++) {
  //       mockData.push({
  //         studentId: `S${i + 1}`,
  //         department: dept,
  //         studentName: `${dept}_Student${i + 1}`,
  //         fine: Math.floor(Math.random() * 1000), // Fine between 0 and 1000
  //       });
  //     }
  //   });
  //   setData(mockData);
  //   setFilteredData(mockData);
  // };
  const mockData = [
    {
        "studentId": "STU10234",
        "department": "CSE",
        "studentName": "Aarav Sharma",
        "fine": 350
    },
    {
        "studentId": "STU10876",
        "department": "CSE",
        "studentName": "Ishita Verma",
        "fine": 120
    },
    {
        "studentId": "STU20456",
        "department": "CSIT",
        "studentName": "Vihaan Gupta",
        "fine": 200
    },
    {
        "studentId": "STU20897",
        "department": "CSIT",
        "studentName": "Ananya Jain",
        "fine": 180
    },
    {
        "studentId": "STU30578",
        "department": "AIML",
        "studentName": "Rohan Mehta",
        "fine": 400
    },
    {
        "studentId": "STU30987",
        "department": "AIML",
        "studentName": "Priya Kapoor",
        "fine": 250
    },
    {
        "studentId": "STU40673",
        "department": "IT",
        "studentName": "Kabir Bansal",
        "fine": 300
    },
    {
        "studentId": "STU40912",
        "department": "IT",
        "studentName": "Simran Kaur",
        "fine": 150
    },
    {
        "studentId": "STU50734",
        "department": "DS",
        "studentName": "Arjun Thakur",
        "fine": 100
    },
    {
        "studentId": "STU50984",
        "department": "DS",
        "studentName": "Meera Nair",
        "fine": 75
    },
    {
        "studentId": "STU60819",
        "department": "Cyber Security",
        "studentName": "Dev Singh",
        "fine": 230
    },
    {
        "studentId": "STU60843",
        "department": "Cyber Security",
        "studentName": "Riya Sharma",
        "fine": 90
    },
    {
        "studentId": "STU70456",
        "department": "RL",
        "studentName": "Aditya Reddy",
        "fine": 310
    },
    {
        "studentId": "STU70932",
        "department": "RL",
        "studentName": "Pooja Mishra",
        "fine": 170
    }
]


  useEffect(() => {
    setData(mockData);
    setFilteredData(mockData);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const searchResults = data.filter(item => item.department.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredData(searchResults);
      if (searchResults.length > 0) {
        setSelectedDepartment(searchResults[0].department); // Automatically set the first matching department
      } else {
        setSelectedDepartment('');
      }
    } else {
      setFilteredData(data);
      setSelectedDepartment('');
    }
  }, [searchQuery, data]);

  // Calculate total fines per department
  const calculateDepartmentFines = () => {
    return departments.map((dept) => {
      const totalFine = filteredData
        .filter((item) => item.department === dept)
        .reduce((acc, item) => acc + item.fine, 0);
      return { department: dept, totalFine };
    });
  };

  const departmentFines = calculateDepartmentFines();

  // Filter data for a specific department
  const departmentData = filteredData.filter(item => item.department === selectedDepartment);

  // Generate data for the bar chart
  const chartData = {
    labels: departmentFines.filter(dept => dept.department === selectedDepartment).map((dept) => dept.department),
    datasets: [
      {
        label: 'Total Fine (₹)',
        data: departmentFines.filter(dept => dept.department === selectedDepartment).map((dept) => dept.totalFine),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Department Fine Report' },
    },
  };

  // Download report as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`${selectedDepartment} Department Fine Report`, 10, 10);
    doc.text('Generated Report of Fines by Student:', 10, 20);
    departmentData.forEach((item, index) => {
      doc.text(`${item.studentName} (ID: ${item.studentId}): ₹${item.fine.toFixed(2)}`, 10, 30 + index * 10);
    });
    doc.save(`${selectedDepartment}_Fine_Report.pdf`);
  };

  // Download report as CSV
  const downloadCSV = () => {
    const csvData = [
      ['Student Name', 'Student ID', 'Fine'],
      ...departmentData.map((item) => [item.studentName, item.studentId, item.fine]),
    ];
    const csvString = csvData.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selectedDepartment}_Fine_Report.csv`);
  };

  // Show student details when clicked
  const viewStudentDetails = (student) => {
    setStudentDetails(student);
    setIsModalOpen(true); // Open modal
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setStudentDetails(null);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f7f7f7', fontFamily: 'Arial, sans-serif', color: '#333', width: '100%' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', color: '#00796b' }}>Department Fine Report</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search Department"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px',
            width: '80%',
            maxWidth: '500px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
          }}
        />
      </div>

      {/* Only show this part if no search is made */}
      {searchQuery === '' && (
        <>
          {/* Default Table for All Departments */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#00796b', color: '#fff' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Department</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Total Fine (₹)</th>
              </tr>
            </thead>
            <tbody>
              {departmentFines.map((dept) => (
                <tr key={dept.department}>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                    {dept.department}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                    ₹{dept.totalFine.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Default Bar Chart for All Departments */}
          <div style={{ marginBottom: '30px', textAlign: 'center' }}>
            <Bar data={{ labels: departmentFines.map((dept) => dept.department), datasets: [{
                label: 'Total Fine (₹)',
                data: departmentFines.map((dept) => dept.totalFine),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }]}} options={chartOptions} />
          </div>
        </>
      )}

      {/* Table displaying the department fines for a specific search */}
      {searchQuery !== '' && selectedDepartment && (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#00796b', color: '#fff' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Student Name</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Student ID</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Fine (₹)</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {departmentData.map((student) => (
                <tr key={student.studentId}>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                    {student.studentName}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                    {student.studentId}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                    ₹{student.fine.toFixed(2)}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                    <button
                      onClick={() => viewStudentDetails(student)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#00796b',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bar Chart for the selected department */}
          <div style={{ marginBottom: '30px', textAlign: 'center' }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </>
      )}

      {/* Modal to show student details */}
      {isModalOpen && studentDetails && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '4px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: '1000',
            width: '80%',
            maxWidth: '500px',
          }}
        >
          <h3 style={{ marginBottom: '20px', color: '#00796b' }}>Student Details</h3>
          <p><strong>Student Name:</strong> {studentDetails.studentName}</p>
          <p><strong>Student ID:</strong> {studentDetails.studentId}</p>
          <p><strong>Department:</strong> {studentDetails.department}</p>
          <p><strong>Fine:</strong> ₹{studentDetails.fine.toFixed(2)}</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={closeModal}
              style={{
                padding: '5px 10px',
                backgroundColor: '#00796b',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Buttons for downloading report */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={downloadPDF}
          style={{
            padding: '10px 20px',
            backgroundColor: '#00796b',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Download as PDF
        </button>
        <button
          onClick={downloadCSV}
          style={{
            padding: '10px 20px',
            backgroundColor: '#00796b',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Download as CSV
        </button>
      </div>
    </div>
  );
};

export default ReportGeneration;
