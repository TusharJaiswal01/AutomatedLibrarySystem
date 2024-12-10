import React, { useContext, useEffect, useState } from 'react';
import "../AdminDashboard.css";
import axios from "axios";
import { AuthContext } from '../../../../Context/AuthContext';
import { Dropdown } from 'semantic-ui-react';

function AddBook() {
    const API_URL = process.env.REACT_APP_API_URL;
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);

    // Book form state
    const [bookName, setBookName] = useState("");
    const [alternateTitle, setAlternateTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [availableCount, setavailableCount] = useState(null);
    const [language, setLanguage] = useState("");
    const [publisher, setPublisher] = useState("");
    const [ISBN, setISBN] = useState("");
    const [subjectCode, setSubjectCode] = useState("");
    const [edition, setEdition] = useState("");
    const [publication, setPublication] = useState("");
    const [semester, setSemester] = useState(null);
    const [department, setDepartment] = useState("");
    const [allCategories, setAllCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    
    const bookCategoryTypes = [
        { value: 'Core', text: 'Core' },
        { value: 'Elective', text: 'Elective' },
        { value: 'Fiction', text: 'Fiction' },


    ];


    useEffect(() => {
        let isMounted = true;
        const getAllCategories = async () => {
            try {
                const response = await axios.get(API_URL + "api/categories/allcategories");
                if (isMounted) {
                    const all_categories = response.data.map(category => (
                        { value: `${category._id}`, text: `${category.categoryName}` }
                    ));
                    setAllCategories(all_categories);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getAllCategories();

        return () => {
            isMounted = false;
        };
    }, [API_URL]);

    const addBook = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const BookData = {
            bookName,
            alternateTitle,
            author,
            availableCount,
            language,
            publisher,
            ISBN,
            subjectCode,
            edition,
            publication,
            semester,
            department,
            categories: selectedCategories,
            isAdmin: user.isAdmin
        };

        try {
            // Ensure all required fields are filled
            if (!bookName || !author || !availableCount || !ISBN || !selectedCategories.length) {
                alert("Please fill in all required fields.");
                setIsLoading(false);
                return;
            }

            await axios.post(API_URL + "api/books/addbook", BookData);

            // Reset form fields after successful addition
            setBookName("");
            setAlternateTitle("");
            setAuthor("");
            setavailableCount(null);
            setLanguage("");
            setPublisher("");
            setISBN("");
            setSubjectCode("");
            setEdition("");
            setPublication("");
            setSemester(null);
            setDepartment("");
            setSelectedCategories([]);

            alert("Book Added Successfully 🎉");
        } catch (err) {
            console.log(err);
            alert("An error occurred while adding the book. Please try again.");
        }
        setIsLoading(false);
    };

    return (
        <div>
            <p className="dashboard-option-title">Add a Book</p>
            <div className="dashboard-title-line"></div>
            <form className='addbook-form' onSubmit={addBook}>
                <label className="addbook-form-label" htmlFor="bookName">Book Name<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" name="bookName" value={bookName} onChange={(e) => setBookName(e.target.value)} required /><br />
                
                <label className="addbook-form-label" htmlFor="alternateTitle">Alternate Title</label><br />
                <input className="addbook-form-input" type="text" name="alternateTitle" value={alternateTitle} onChange={(e) => setAlternateTitle(e.target.value)} /><br />

                <label className="addbook-form-label" htmlFor="author">Author Name<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} required /><br />

                <label className="addbook-form-label" htmlFor="ISBN">ISBN<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" name="ISBN" value={ISBN} onChange={(e) => setISBN(e.target.value)} required /><br />

                <label className="addbook-form-label" htmlFor="subjectCode">Subject Code</label><br />
                <input className="addbook-form-input" type="text" name="subjectCode" value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)} /><br />

                <label className="addbook-form-label" htmlFor="edition">Edition</label><br />
                <input className="addbook-form-input" type="text" name="edition" value={edition} onChange={(e) => setEdition(e.target.value)} /><br />

                <label className="addbook-form-label" htmlFor="publisher">Publisher</label><br />
                <input className="addbook-form-input" type="text" name="publisher" value={publisher} onChange={(e) => setPublisher(e.target.value)} /><br />

                <label className="addbook-form-label" htmlFor="semester">Semester</label><br />
                <input className="addbook-form-input" type="number" name="semester" value={semester} onChange={(e) => setSemester(e.target.value)} /><br />

                <label className="addbook-form-label" htmlFor="department">Department</label><br />
                <input className="addbook-form-input" type="text" name="department" value={department} onChange={(e) => setDepartment(e.target.value)} /><br />

                <label className="addbook-form-label" htmlFor="copies">No. of Copies Available<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="number" name="copies" value={availableCount} onChange={(e) => setavailableCount(e.target.value)} required /><br />

                <label className="addbook-form-label" htmlFor="categories">Categories<span className="required-field">*</span></label><br />
                <div className="semanticdropdown">
                    <Dropdown
                        placeholder='Category'
                        fluid
                        multiple
                        search
                        selection
                        options={allCategories}
                        // options={bookCategoryTypes}
                        value={selectedCategories}
                        onChange={(event, value) => setSelectedCategories(value.value)}
                    />
                </div>

                <button className="addbook-button" type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Book"}
                </button>
            </form>
        </div>
    );
}

export default AddBook;
