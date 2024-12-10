import React, { useState } from 'react'
import "./AdminDashboard.css"
import AddTransaction from './Components/AddTransaction'
import AddMember from './Components/AddMember'
import AddBook from './Components/AddBook';
import Request from './Components/Request';
import GetMember from './Components/GetMember';
import Return from './Components/Return';



import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BookIcon from '@material-ui/icons/Book';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ReportGeneration from './Components/ReportGeneration';


const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

function AdminDashboard() {

    const [active, setActive] = useState("null")
    const [sidebar, setSidebar] = useState(false)

    /* Logout Function*/
    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    }

    return (
        <div className="dashboard ">
            <div className="dashboard-card ">
                <div className="sidebar-toggler" onClick={() => setSidebar(!sidebar)}>
                    <IconButton>
                        {sidebar ? <CloseIcon style={{ fontSize: 25, color: "rgb(234, 68, 74)" }} /> : <DoubleArrowIcon style={{ fontSize: 25, color: "rgb(234, 68, 74)" }} />}
                    </IconButton>
                </div>

                {/* Sidebar */}
                <div className={sidebar ? "dashboard-options active" : "dashboard-options"}>

                    <p className={`dashboard-option ${active === "profile" ? "clicked" : ""}`} onClick={() => { setActive("profile"); setSidebar(false) }}><AccountCircleIcon className='dashboard-option-icon' /> Generate Report</p>
                    <p className={`dashboard-option ${active === "addbook" ? "clicked" : ""}`} onClick={() => { setActive("addbook"); setSidebar(false) }}><BookIcon className='dashboard-option-icon' />Add Book</p>
                    <p className={`dashboard-option ${active === "addtransaction" ? "clicked" : ""}`} onClick={() => { setActive("addtransaction"); setSidebar(false) }}><ReceiptIcon className='dashboard-option-icon' /> Issue/Return </p>
                    <p className={`dashboard-option ${active === "getmember" ? "clicked" : ""}`} onClick={() => { setActive("getmember"); setSidebar(false) }}><AccountBoxIcon className='dashboard-option-icon' /> Get Student Details </p>
                    <p className={`dashboard-option ${active === "addmember" ? "clicked" : ""}`} onClick={() => { setActive("addmember"); setSidebar(false) }}><PersonAddIcon className='dashboard-option-icon' /> Add Member </p>

                    {/* New Request option */}
                    <p className={`dashboard-option ${active === "request" ? "clicked" : ""}`} onClick={() => { setActive("request"); setSidebar(false) }}><ReceiptIcon className='dashboard-option-icon' /> Requests </p>

                    <p className={`dashboard-option ${active === "returntransaction" ? "clicked" : ""}`} onClick={() => { setActive("returntransaction"); setSidebar(false) }}><AssignmentReturnIcon className='dashboard-option-icon' /> Return </p>
                    <p className={`dashboard-option`} onClick={logout}><PowerSettingsNewIcon className='dashboard-option-icon' /> Log out </p>

                </div>
                <div className="dashboard-option-content">
                    <div className="for null " style={active !== "null" ? { display: 'none' } : { display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <div style={{ fontSize: "4em", marginTop: "5rem", fontWeight: "bold" }}>
                            Welcome to admin dashboard
                        </div>


                        <div
                            style={{
                                margin: "60px auto",
                                maxWidth: "800px",
                                backgroundColor: "#f5f5f5",
                                padding: "20px",
                                borderRadius: "10px",
                                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
                                lineHeight: "1.6",
                                fontSize: "15px",
                                color: "#333",
                                textAlign: "justify",

                            }}
                        >
                            <p>
                                As an administrator of the library management system, you hold the
                                responsibility of maintaining an organized and efficient system for
                                managing students and books. From this dashboard, you can perform
                                various tasks including:
                            </p>
                            <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
                                <li>Registering new students into the library system.</li>
                                <li>Adding Books in the inventory.</li>
                                <li>Maintaining the record of books , their return.</li>

                                <li>Generating detailed reports for better management.</li>
                            </ul>
                            <p style={{ marginTop: "10px" }}>
                                Use this dashboard to ensure seamless operations and provide students
                                with a smooth library experience. Stay organized, stay informed!
                            </p>
                        </div>










                    </div>

                    <div className="dashboard-addbooks-content" style={active !== "profile" ? { display: 'none' } : {}}>
                        <ReportGeneration />
                    </div>
                    <div className="dashboard-addbooks-content" style={active !== "addbook" ? { display: 'none' } : {}}>
                        <AddBook />
                    </div>
                    <div className="dashboard-transactions-content" style={active !== "addtransaction" ? { display: 'none' } : {}}>
                        <AddTransaction />
                    </div>
                    <div className="dashboard-addmember-content" style={active !== "addmember" ? { display: 'none' } : {}}>
                        <AddMember />
                    </div>
                    <div className="dashboard-getmember-content" style={active !== "getmember" ? { display: 'none' } : {}}>
                        <GetMember />
                    </div>
                    <div className="dashboard-return-content" style={active !== "returntransaction" ? { display: 'none' } : {}}>
                        <Return />
                    </div>

                    {/* Request Component Content */}
                    <div className="dashboard-request-content" style={active !== "request" ? { display: 'none' } : {}}>
                        <Request />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;
