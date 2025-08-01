import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { useFormContext } from "../../context/AdminFormContext";
import "../../scss/dashboard.scss";
import FileUploadCitizen from "../FileUploadCitizen";
import { useSCFormContext } from "../../context/ScFormContext";
import { Plus, Printer, Archive, Pencil, Trash2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import Id from "../../components/Id";

const SCChapter = () => {
  const { isAdminAuthenticated } = useFormContext();
  const {
    formData,
    setFormData,
    handleCreateDone,
    isShowID,
    setIsShowID,
    initialData,
  } = useSCFormContext();
  const [adminData, setAdminData] = useState(null);

  const [showSpinner, setShowSpinner] = useState(true); // Control spinner visibility
  const [showTextSpin, setShowTextPin] = useState(true); // Control spinner visibility
  const [showSuccess, setShowSuccess] = useState(false); // Control spinner visibility

  const formRef = useRef(null);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isCreateButtonClicked, setIsCreateButtonClicked] = useState(false);

  const handleShowID = () => {
    setIsShowID(true);
    setIsAddClicked(false);
    setIsCreateButtonClicked(false);
    setShowSuccess(false);
    setShowTextPin(true);
    setShowSpinner(true);
  };

  const [errors, setErrors] = useState({
    oscaID: "",
    contrNum: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    age: "",
    birthday: "",
    civilStat: "",
    placeOfBirth: "",
    address: "",
    contactNum: "",
  });

  useEffect(() => {
    if (isAdminAuthenticated) {
      // Get admin data from localStorage
      const storedAdminData = JSON.parse(localStorage.getItem("adminFormData"));
      if (storedAdminData) {
        setAdminData(storedAdminData);
      }
    }

    // Set the date_created to the current date (format: YYYY-MM-DD)
    setFormData((prevFormData) => ({
      ...prevFormData,
      date_created: new Date().toISOString().split("T")[0], // current date in YYYY-MM-DD format
    }));
  }, [isAdminAuthenticated]);

  const getImagePath = (imagePath) => {
    // Return the path relative to the public directory
    return imagePath
      ? `http://localhost/seniorpayment/${imagePath}`
      : "./img/123.jpg";
  };

  const handleFileChange = (file) => {
    console.log(file); // Add this line to check the file object
    if (file && file instanceof File) {
      setFormData({
        ...formData,
        img: file,
      });
    } else {
      console.error("Invalid file");
    }
  };

  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    const fields = [
      {
        name: "oscaID",
        message: "OSCA ID is required!",
        validator: isRequired,
      },
      {
        name: "contrNum",
        message: "Control No. is required!",
        validator: isRequired,
      },
      {
        name: "firstName",
        message: "First Name is required!",
        validator: isRequired,
      },
      {
        name: "middleName",
        message: "Middle Name is required!",
        validator: isRequired,
      },
      {
        name: "lastName",
        message: "Last Name is required!",
        validator: isRequired,
      },
      { name: "gender", message: "Gender is required!", validator: isRequired },
      {
        name: "age",
        message: "Age should be a valid positive number!",
        validator: isPositiveNumber,
      },
      {
        name: "birthday",
        message: "Invalid Birthday Date!",
        validator: isValidDate,
      },
      {
        name: "civilStat",
        message: "Civil Status is required!",
        validator: isRequired,
      },
      {
        name: "placeOfBirth",
        message: "Place of Birth is required!",
        validator: isRequired,
      },
      {
        name: "address",
        message: "Address is required!",
        validator: isRequired,
      },
      {
        name: "contactNum",
        message: "Invalid Contact Number!",
        validator: isValidPhoneNumber,
      },
    ];

    fields.forEach((field) => {
      const value = formData[field.name];
      if (!field.validator(value)) {
        isValid = false;
        errors[field.name] = field.message;
      } else {
        errors[field.name] = "";
      }
    });

    if (!formData.img) {
      isValid = false;
      errors.img = "Please upload a profile image.";
    } else {
      errors.img = "";
    }

    setErrors(errors);
    setStatusMessage(
      isValid ? "" : "Please fill all required fields correctly."
    );

    return isValid;
  };

  // Helper functions for validation
  const isRequired = (value) => value && value.trim() !== "";
  const isPositiveNumber = (value) => value && !isNaN(value) && value > 0;
  const isValidDate = (value) => value && /^\d{4}-\d{2}-\d{2}$/.test(value);
  const isValidPhoneNumber = (value) => value && /^\d{11}$/.test(value);

  const handleAddClick = (e) => {
    e.preventDefault(); // Prevent form submission
    if (validateForm()) {
      setIsAddClicked(true); // Show confirmation dialog
    } else {
      setIsAddClicked(false); // Hide confirmation dialog if form is invalid
    }
  };

  // Helper function to generate an array of days (1-31)
  const generateDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(i < 10 ? `0${i}` : i.toString()); // Format day as two digits
    }
    return days;
  };

  // Helper function to generate years from current year to 100 years ago
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push(i.toString());
    }
    return years;
  };

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "birthday_month" ||
      name === "birthday_day" ||
      name === "birthday_year"
    ) {
      // Update individual birthday parts
      const updatedFormData = {
        ...formData,
        [name]: value,
      };

      // Only update the combined birthday if all parts are present
      const { birthday_year, birthday_month, birthday_day } = updatedFormData;
      if (birthday_year && birthday_month && birthday_day) {
        updatedFormData.birthday = `${birthday_year}-${birthday_month}-${birthday_day}`;

        // Calculate age based on the birthday
        const currentDate = new Date();
        const birthDate = new Date(
          `${birthday_year}-${birthday_month}-${birthday_day}`
        );
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = currentDate.getMonth() - birthDate.getMonth();

        // If the birthday hasn't occurred yet this year, subtract 1 from the age
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        updatedFormData.age = age;
      } else {
        updatedFormData.birthday = ""; // If any part is missing, set birthday to empty
        updatedFormData.age = ""; // Clear age if birthday is incomplete
      }

      setFormData(updatedFormData);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (formData.img) {
      formDataToSend.append("img", formData.img);
    }

    formDataToSend.append("type", "scChapter");

    setShowTextPin(true); // Start the submission process and show the spinner
    setShowSpinner(true); // Ensure spinner is visible during submission

    try {
      const response = await fetch(
        "http://localhost/seniorpayment/scInfo.php",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Parse the JSON response

      if (data.status === 1) {
        setStatusMessage("Data submitted successfully!");
        setIsSuccess(true);
        // Wait 3 seconds before hiding the spinner
        setTimeout(() => {
          setShowSpinner(false); // Hide spinner after 3 seconds
        }, 3000);
        setTimeout(() => {
          setShowTextPin(false); // Hide texts after 0 seconds
        }, 0);
        setTimeout(() => {
          setShowSuccess(true);
        }, 5000);
      } else {
        setStatusMessage(data.message);
        setIsSuccess(false);
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        setStatusMessage("Invalid response from server.");
      } else {
        setStatusMessage("Error submitting data.");
      }
      setIsSuccess(false);
      setShowSpinner(false); // Hide spinner immediately in case of error
      console.error("Error submitting form data:", error);
    }
  };

  const [editData, setEditData] = useState(null); // State to hold data being edited

  const handleEditClick = (item) => {
    setEditData(item);
    setFormData({
      oscaID: item.oscaID,
      contrNum: item.contrNum,
      firstName: item.firstName,
      middleName: item.middleName,
      lastName: item.lastName,
      gender: item.gender,
      age: item.age,
      birthday: item.birthday,
      civilStat: item.civilStat,
      placeOfBirth: item.placeOfBirth,
      contactNum: item.contactNum,
      address: item.address,
      img: item.img,
    });
  };

  const handleCancel = () => {
    // Reset form data to the initial values or close the edit mode
    setFormData(initialData); // Reset form data to initial state (replace with your actual initial data)
    setEditData(false); // Close edit mode or reset the state to indicate you're no longer editing
  };

  const [scChapterData, setScChapterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // We show 10 items per page

  // Filter data based on search term
  const filterData = (data, searchTerm) => {
    if (!searchTerm) {
      return data; // If no search term, return all data
    }

    return data.filter((item) => {
      // Search across all fields
      const searchableFields = [
        item.oscaID,
        item.contrNum,
        item.firstName,
        item.middleName,
        item.lastName,
        item.gender,
        item.age,
        item.birthday,
        item.civilStat,
        item.placeOfBirth,
        item.address,
        item.contactNum,
      ];

      return searchableFields.some((field) =>
        String(field).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  // Pagination logic
  const paginateData = (data, currentPage, itemsPerPage) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter the data with the search term
  const filteredData = filterData(scChapterData, searchTerm);

  // Paginate the filtered data
  const paginatedData = paginateData(
    filteredData.filter((item) => item.archived !== 1),
    currentPage,
    itemsPerPage
  );

  // Get total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleDeleteClick = async (oscaID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      const response = await fetch(
        "http://localhost/seniorpayment/delete.php",
        {
          method: "DELETE",
          body: JSON.stringify({ oscaID }), // Send the oscaID to delete
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.status === 1) {
        alert("Data deleted successfully!");

        // Remove the deleted item from the state directly
        setScChapterData((prevData) =>
          prevData.filter((item) => item.oscaID !== oscaID)
        );
      } else {
        alert(result.message || "Failed to delete data.");
      }
    }
  };

  const handleArchiveClick = async (oscaID) => {
    // Send archive request to the backend
    const response = await fetch("http://localhost/seniorpayment/archive.php", {
      method: "POST",
      body: JSON.stringify({ oscaID }), // Send the oscaID to archive
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (result.status === 1) {
      alert("Data archived successfully!");

      // Update the local state to remove the archived item
      setScChapterData((prevData) =>
        prevData.filter((item) => item.oscaID !== oscaID)
      );
    } else {
      alert(result.message || "Failed to archive data.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost/seniorpayment/editSc.php", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.status === 1) {
      alert("Record updated successfully!");
      setScChapterData((prevData) =>
        prevData.map((item) =>
          item.oscaID === formData.oscaID ? { ...item, ...formData } : item
        )
      );
      setEditData(null);
    } else {
      alert("Failed to update the record.");
    }
  };
  console.log(formData);

  useEffect(() => {
    fetch("http://localhost/seniorpayment/scChapter.php", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 1) {
          setScChapterData(data.data);
          setLoading(false);
        } else {
          setError(data.message || "No data available");
          setLoading(false);
        }
      })
      .catch((error) => {
        setError("Error fetching data: " + error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50">
      <div className="dashboard-comp">
        <Navbar getImagePath={getImagePath} adminData={adminData} />
        <Sidebar getImagePath={getImagePath} adminData={adminData} />
        <div className="dash-body flex items-start justify-between ml-72">
          <div className="dashboard-main w-full">
            <div className="flex flex-col mb-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-purple-500" />
                <h1 className="text-3xl font-bold text-gray-800">
                  Senior Citizen Management
                </h1>
              </div>
              <span className="text-sm font-medium text-purple-500 tracking-wide pl-11">
                SC Chapter
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div className=" flex items-center w-full md:w-auto bg-white border border-violet-200 shadow-sm px-4 py-2 rounded-full gap-2">
                <svg
                  className="w-5 h-5 text-violet-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  name="searchCitizen"
                  placeholder="Search Citizens Here!"
                  className="bg-transparent focus:outline-none w-full md:w-56"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setIsCreateButtonClicked(!isCreateButtonClicked)
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-full shadow hover:bg-green-600 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add New Applicant
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-violet-500 text-white font-semibold rounded-full shadow hover:bg-violet-600 transition">
                  <Printer className="w-4 h-4" />
                  Print MasterList
                </button>
                <Link
                  to={"/admin/binscchapter"}
                  className="flex items-center gap-2 px-4 py-2 bg-fuchsia-500 text-white font-semibold rounded-full shadow hover:bg-fuchsia-600 transition"
                >
                  <Archive className="w-4 h-4" />
                  Bin
                </Link>
              </div>
            </div>
            {/* Edit Form */}
            {editData && (
              <>
                <div className="edit-content bg-white rounded-2xl shadow-lg p-6 mb-6">
                  <h2 className="text-lg font-bold mb-4">Edit Citizen Info</h2>
                  <form
                    onSubmit={handleFormSubmit}
                    className="form-container grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <label
                        className="block font-medium mb-1"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-violet-400"
                      />
                    </div>
                    <form
                      onSubmit={handleFormSubmit}
                      className="form-container"
                    >
                      <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                          id="firstName"
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="middleName">Middle Name:</label>
                        <input
                          id="middleName"
                          type="text"
                          name="middleName"
                          value={formData.middleName}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                          id="lastName"
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <input
                          id="gender"
                          type="text"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <input
                          id="age"
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="birthday">Birthday:</label>
                        <input
                          id="birthday"
                          type="date"
                          name="birthday"
                          value={formData.birthday}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="civilStat">Civil Status:</label>
                        <input
                          id="civilStat"
                          type="text"
                          name="civilStat"
                          value={formData.civilStat}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="placeOfBirth">Place of Birth:</label>
                        <input
                          id="placeOfBirth"
                          type="text"
                          name="placeOfBirth"
                          value={formData.placeOfBirth}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="contactNum">Contact Number:</label>
                        <input
                          id="contactNum"
                          type="text"
                          name="contactNum"
                          value={formData.contactNum}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                          id="address"
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="button-container">
                        <button type="submit" className="submit-btn">
                          Update
                        </button>
                        <button
                          type="button"
                          className="cancel-btn"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                    <div className="col-span-full flex gap-3 mt-3">
                      <button
                        type="submit"
                        className="submit-btn bg-violet-600 text-white py-2 px-6 rounded-full hover:bg-violet-700 transition font-semibold"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="cancel-btn bg-gray-200 text-gray-700 py-2 px-6 rounded-full hover:bg-gray-300 transition font-semibold"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>

                  <div className="edit-applicant flex flex-col justify-start mt-4">
                    <h2 className="!text-left font-semibold px-[20px]">
                      Citizen ID:
                    </h2>
                    <div className="id-card flex flex-wrap items-center gap-4">
                      <Id formData={formData} />
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* Data Table */}
            <div className="rounded-2xl overflow-x-auto">
              <table
                className="min-w-full divide-y divide-gray-200 border-separate mt-4"
                style={{ borderSpacing: 0 }}
              >
                <thead>
                  <tr className="bg-gradient-to-br from-purple-500 via-purple-400 to-purple-300">
                    {[
                      "OSCA ID",
                      "Control No.",
                      "Full Name",
                      "Gender",
                      "Age",
                      "Birthday",
                      "Civil Status",
                      "Place of Birth",
                      "Address",
                      "Contact",
                      "Archive",
                      "Action",
                    ].map((label, i) => (
                      <th
                        key={label}
                        className={`px-4 py-6 text-nowrap text-sm font-bold text-white uppercase tracking-wider
                                        ${i === 0 ? "rounded-tl-2xl" : ""}
                                        ${i === 11 ? "rounded-tr-2xl" : ""}
                                        ${
                                          label === "Archive" ||
                                          label === "Action"
                                            ? "text-center"
                                            : "text-left"
                                        }
                                    `}
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item) => (
                      <tr
                        key={item.oscaID}
                        className="hover:bg-violet-50 transition rounded-xl text-nowrap "
                      >
                        <td className="px-4 py-3 font-mono text-violet-700">
                          {item.oscaID}
                        </td>
                        <td className="px-4 py-3">{item.contrNum}</td>
                        <td className="px-4 py-3">{`${item.firstName} ${item.middleName} ${item.lastName}`}</td>
                        <td className="px-4 py-3">{item.gender}</td>
                        <td className="px-4 py-3 text-center">{item.age}</td>
                        <td className="px-4 py-3">{item.birthday}</td>
                        <td className="px-4 py-3">{item.civilStat}</td>
                        <td className="px-4 py-3">{item.placeOfBirth}</td>
                        <td className="px-4 py-3">{item.address}</td>
                        <td className="px-4 py-3">{item.contactNum}</td>
                        <td className="px-4 py-3 text-center">
                          <button
                            className="px-3 py-3 text-sm font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition inline-flex items-center gap-1"
                            onClick={() => handleArchiveClick(item.oscaID)}
                            title="Archive"
                          >
                            <Archive className="w-4 h-4 text-white" />
                            Archive
                          </button>
                        </td>
                        <td className="px-4 py-3 flex flex-col sm:flex-row gap-2 justify-center items-center">
                          <button
                            className="px-3 py-3 text-sm font-semibold bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition inline-flex items-center gap-1"
                            onClick={() => handleEditClick(item)}
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4 text-white-500" />
                          </button>
                          <button
                            className="px-3 py-3 text-sm font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition inline-flex items-center gap-1"
                            onClick={() => handleDeleteClick(item.oscaID)}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-white" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="12"
                        className="py-8 text-center text-gray-500 rounded-b-2xl"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="pagination-container flex items-center justify-center gap-2 mt-6">
                <button
                  className="pagination-btn px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {[...Array(totalPages).keys()].map((page) => (
                  <button
                    key={page}
                    className={`pagination-btn px-3 py-1 rounded-lg ${
                      currentPage === page + 1
                        ? "bg-violet-600 text-white font-bold"
                        : "bg-gray-100 text-gray-700 hover:bg-violet-50"
                    } transition`}
                    onClick={() => handlePageChange(page + 1)}
                  >
                    {page + 1}
                  </button>
                ))}
                <button
                  className="pagination-btn px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {isShowID && (
          <div className="create-applicant absolute flex items-center justify-center">
            <div className="card-applicant p-4">
              <svg
                className="exit"
                onClick={handleCreateDone}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.02 20C1.44417 20 0.96375 19.8075 0.57875 19.4225C0.19375 19.0375 0.000833333 18.5567 0 17.98V14.0875H1.25V17.9813C1.25 18.1738 1.33 18.3504 1.49 18.5112C1.65 18.6721 1.82625 18.7521 2.01875 18.7512H17.9813C18.1729 18.7512 18.3492 18.6712 18.51 18.5112C18.6708 18.3512 18.7508 18.1746 18.75 17.9813V2.02C18.75 1.8275 18.67 1.65083 18.51 1.49C18.35 1.32917 18.1733 1.24917 17.98 1.25H2.02C1.8275 1.25 1.65083 1.33 1.49 1.49C1.32917 1.65 1.24917 1.82667 1.25 2.02V5.9125H0V2.02C0 1.44417 0.192916 0.96375 0.57875 0.57875C0.964583 0.19375 1.445 0.000833333 2.02 0H17.9813C18.5563 0 19.0367 0.192916 19.4225 0.57875C19.8083 0.964583 20.0008 1.445 20 2.02V17.9813C20 18.5563 19.8075 19.0367 19.4225 19.4225C19.0375 19.8083 18.5567 20.0008 17.98 20H2.02ZM8.5575 14.9038L7.67375 14.0037L11.0525 10.625H0V9.375H11.0525L7.675 5.995L8.55875 5.09625L13.4625 10L8.5575 14.9038Z"
                  fill="black"
                />
              </svg>
              <div className="header-card">
                <h1 className="text-2xl"> New Membership Application </h1>
                <p className="text-xl">
                  {" "}
                  Senior Citizen Chapter - ID Front & Back{" "}
                </p>
              </div>
              <div className="id-card flex items-center justify-evenly">
                <Id formData={formData} />
              </div>

              <div className="buttons flex items-center justify-center">
                <button className="btn-exit" onClick={handleCreateDone}>
                  Exit
                </button>
                <button className="btn-print">Print</button>
              </div>
            </div>
          </div>
        )}

        {isCreateButtonClicked && (
          <div className="create-applicant absolute flex items-center justify-center">
            {isAddClicked && (
              <div className="submittion-status flex items-center justify-center">
                <div className="correction flex items-center justify-center">
                  <div className="in grid gap-5">
                    {showSuccess ? (
                      <>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 23.25C13.4774 23.25 14.9403 22.959 16.3052 22.3936C17.6701 21.8283 18.9103 20.9996 19.955 19.955C20.9996 18.9103 21.8283 17.6701 22.3936 16.3052C22.959 14.9403 23.25 13.4774 23.25 12C23.25 10.5226 22.959 9.05972 22.3936 7.69481C21.8283 6.3299 20.9996 5.08971 19.955 4.04505C18.9103 3.00039 17.6701 2.17172 16.3052 1.60636C14.9403 1.04099 13.4774 0.75 12 0.75C9.01631 0.75 6.15483 1.93526 4.04505 4.04505C1.93526 6.15483 0.75 9.01631 0.75 12C0.75 14.9837 1.93526 17.8452 4.04505 19.955C6.15483 22.0647 9.01631 23.25 12 23.25ZM11.71 16.55L17.96 9.05L16.04 7.45L10.665 13.8988L7.88375 11.1163L6.11625 12.8837L9.86625 16.6337L10.8338 17.6013L11.71 16.55Z"
                            fill="black"
                          />
                        </svg>
                        <h1>Congratulations applicant has been registered!</h1>
                        <div
                          className="show-id"
                          onClick={(e) => handleShowID(e)}
                        >
                          <h5> Show ID </h5>
                        </div>
                      </>
                    ) : (
                      <div>
                        {showSpinner && <div className="loading-spinner"></div>}
                        <h1 className="text-2xl text-center">
                          {isSuccess
                            ? "Generating Membership ID, Please wait..."
                            : "Are you sure your information is correct?"}
                        </h1>
                        {showTextSpin && (
                          <div className="button-opt flex items-center justify-center w-full gap-5">
                            <button
                              onClick={(e) => setIsAddClicked(false)}
                              className="submit-button w-full bg-white text-black py-3"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSubmit}
                              className="submit-button w-full bg-violet-600 text-white py-3"
                            >
                              Yes
                            </button>
                          </div>
                        )}
                        {showTextSpin && statusMessage && (
                          <div
                            className={`status-message ${
                              isSuccess ? "success" : "error"
                            }`}
                          >
                            <p>{statusMessage}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="card-applicant p-4">
              <svg
                className="exit"
                onClick={(e) => setIsCreateButtonClicked(false)}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.02 20C1.44417 20 0.96375 19.8075 0.57875 19.4225C0.19375 19.0375 0.000833333 18.5567 0 17.98V14.0875H1.25V17.9813C1.25 18.1738 1.33 18.3504 1.49 18.5112C1.65 18.6721 1.82625 18.7521 2.01875 18.7512H17.9813C18.1729 18.7512 18.3492 18.6712 18.51 18.5112C18.6708 18.3512 18.7508 18.1746 18.75 17.9813V2.02C18.75 1.8275 18.67 1.65083 18.51 1.49C18.35 1.32917 18.1733 1.24917 17.98 1.25H2.02C1.8275 1.25 1.65083 1.33 1.49 1.49C1.32917 1.65 1.24917 1.82667 1.25 2.02V5.9125H0V2.02C0 1.44417 0.192916 0.96375 0.57875 0.57875C0.964583 0.19375 1.445 0.000833333 2.02 0H17.9813C18.5563 0 19.0367 0.192916 19.4225 0.57875C19.8083 0.964583 20.0008 1.445 20 2.02V17.9813C20 18.5563 19.8075 19.0367 19.4225 19.4225C19.0375 19.8083 18.5567 20.0008 17.98 20H2.02ZM8.5575 14.9038L7.67375 14.0037L11.0525 10.625H0V9.375H11.0525L7.675 5.995L8.55875 5.09625L13.4625 10L8.5575 14.9038Z"
                  fill="black"
                />
              </svg>
              <div className="header-card">
                <h1 className="text-2xl"> New Membership Application </h1>
                <p className="text-xl"> Senior Citizen Chapter </p>
              </div>
              <form
                className="card-main flex items-center justify-between"
                ref={formRef}
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <div className="img-card grid gap-10">
                  {/* <img src="/img/" alt="Profile Picture" /> */}
                  {formData.img && formData.img instanceof File ? (
                    <img
                      src={URL.createObjectURL(formData.img)}
                      alt="Profile"
                    />
                  ) : // Use the path stored in localStorage (which should be a relative URL like "/profile/m2.png")
                  formData.img ? (
                    <img src={formData.img} alt="Profile" />
                  ) : (
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.25 0.75H20.5C21.4946 0.75 22.4484 1.14509 23.1517 1.84835C23.8549 2.55161 24.25 3.50544 24.25 4.5V20.75C24.25 21.7446 23.8549 22.6984 23.1517 23.4017C22.4484 24.1049 21.4946 24.5 20.5 24.5H4.25C3.25544 24.5 2.30161 24.1049 1.59835 23.4017C0.895088 22.6984 0.5 21.7446 0.5 20.75V4.5C0.5 3.50544 0.895088 2.55161 1.59835 1.84835C2.30161 1.14509 3.25544 0.75 4.25 0.75ZM4.25 2C3.58696 2 2.95107 2.26339 2.48223 2.73223C2.01339 3.20107 1.75 3.83696 1.75 4.5V18.9875L7.1125 13.6125L10.2375 16.7375L16.4875 10.4875L23 17V4.5C23 3.83696 22.7366 3.20107 22.2678 2.73223C21.7989 2.26339 21.163 2 20.5 2H4.25ZM10.2375 18.5125L7.1125 15.3875L1.75 20.75C1.75 21.413 2.01339 22.0489 2.48223 22.5178C2.95107 22.9866 3.58696 23.25 4.25 23.25H20.5C21.163 23.25 21.7989 22.9866 22.2678 22.5178C22.7366 22.0489 23 21.413 23 20.75V18.7625L16.4875 12.2625L10.2375 18.5125ZM7.375 4.5C8.2038 4.5 8.99866 4.82924 9.58471 5.41529C10.1708 6.00134 10.5 6.7962 10.5 7.625C10.5 8.4538 10.1708 9.24866 9.58471 9.83471C8.99866 10.4208 8.2038 10.75 7.375 10.75C6.5462 10.75 5.75134 10.4208 5.16529 9.83471C4.57924 9.24866 4.25 8.4538 4.25 7.625C4.25 6.7962 4.57924 6.00134 5.16529 5.41529C5.75134 4.82924 6.5462 4.5 7.375 4.5ZM7.375 5.75C6.87772 5.75 6.4008 5.94754 6.04917 6.29917C5.69754 6.6508 5.5 7.12772 5.5 7.625C5.5 8.12228 5.69754 8.5992 6.04917 8.95083C6.4008 9.30246 6.87772 9.5 7.375 9.5C7.87228 9.5 8.3492 9.30246 8.70083 8.95083C9.05246 8.5992 9.25 8.12228 9.25 7.625C9.25 7.12772 9.05246 6.6508 8.70083 6.29917C8.3492 5.94754 7.87228 5.75 7.375 5.75Z"
                        fill="black"
                      />
                    </svg>
                  )}
                  <div className="img-opt flex items-center justify-center gap-3">
                    <button> Crop </button>
                    <button> Capture </button>
                  </div>
                  <FileUploadCitizen onFileChange={handleFileChange} />
                  {errors.img && (
                    <span className="text-red-500">{errors.img}</span>
                  )}{" "}
                  {/* Error message for image */}
                </div>
                <div className="fill-text-card flex items-center justify-start flex-wrap gap-5">
                  {/* Name fields */}
                  <div className="label-scinfo">
                    <label htmlFor="">Date:</label>
                    <div className="label-inputs flex items-center justify-start gap-4">
                      <div className="label-input">
                        <input
                          type="text"
                          name="date_created"
                          placeholder="ex. 11-20-2024"
                          value={formData.date_created}
                          onChange={handleInputChange}
                          readOnly
                          disabled // Makes the field unclickable and non-editable
                        />
                        <label htmlFor=""> Date Created </label>
                      </div>
                    </div>
                  </div>
                  <div className="label-scinfo">
                    <label htmlFor="">OSCA ID No.</label>
                    <div className="label-inputs flex items-center justify-start gap-4">
                      <div className="label-input">
                        <input
                          type="text"
                          name="oscaID"
                          placeholder="ex. 22321231132"
                          value={formData.oscaID}
                          onChange={handleInputChange}
                        />
                        <label htmlFor=""> Osca ID Number. </label>
                        {errors.oscaID && (
                          <label className="text-red-500">
                            {errors.oscaID}
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="label-scinfo">
                    <label htmlFor="">Control No.</label>
                    <div className="label-inputs flex items-center justify-start gap-4">
                      <div className="label-input">
                        <input
                          type="text"
                          name="contrNum"
                          placeholder="ex. 22321231132"
                          value={formData.contrNum}
                          onChange={handleInputChange}
                        />
                        <label htmlFor=""> Control # </label>
                        {errors.contrNum && (
                          <label className="text-red-500">
                            {errors.contrNum}
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="label-scinfo">
                    <label htmlFor="">NAME OF NEW APPLICANT:</label>
                    <div className="label-inputs flex items-center justify-start gap-4 flex-wrap">
                      <div className="label-input">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="ex. Julian"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="">Firstname</label>
                        {errors.firstName && (
                          <label className="text-red-500">
                            {errors.firstName}
                          </label>
                        )}
                      </div>
                      <div className="label-input">
                        <input
                          type="text"
                          name="suffix"
                          placeholder="ex. Jr III"
                          value={formData.suffix}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="">Suffix</label>
                        {errors.suffix && (
                          <label className="text-red-500">
                            {errors.suffix}
                          </label>
                        )}
                      </div>
                      <div className="label-input">
                        <input
                          type="text"
                          name="middleName"
                          placeholder="ex. Midman"
                          value={formData.middleName}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="">Middle Name</label>
                        {errors.middleName && (
                          <label className="text-red-500">
                            {errors.middleName}
                          </label>
                        )}
                      </div>
                      <div className="label-input">
                        <input
                          type="text"
                          name="lastName"
                          placeholder="ex. Lionel"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="">Surname</label>
                        {errors.lastName && (
                          <label className="text-red-500">
                            {errors.lastName}
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Birthday Fields */}
                  <div className="label-scinfo">
                    <label htmlFor="">BIRTHDAY:</label>
                    <div className="label-inputs flex items-center justify-start gap-4">
                      <div className="label-input">
                        <select
                          name="birthday_month"
                          value={formData.birthday_month}
                          onChange={handleInputChange}
                        >
                          <option value="">Month</option>
                          {[
                            "01",
                            "02",
                            "03",
                            "04",
                            "05",
                            "06",
                            "07",
                            "08",
                            "09",
                            "10",
                            "11",
                            "12",
                          ].map((month, index) => (
                            <option key={index} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="">Month</label>
                        {errors.birthday && (
                          <label className="text-red-500">
                            {errors.birthday}
                          </label>
                        )}
                      </div>
                      <div className="label-input">
                        <select
                          name="birthday_day"
                          value={formData.birthday_day}
                          onChange={handleInputChange}
                        >
                          <option value="">Day</option>
                          {generateDays().map((day, index) => (
                            <option key={index} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="">Day</label>
                        {errors.birthday && (
                          <label className="text-red-500">
                            {errors.birthday}
                          </label>
                        )}
                      </div>
                      <div className="label-input">
                        <select
                          name="birthday_year"
                          value={formData.birthday_year} // Ensure the value is properly bound to formData.birthday_year
                          onChange={handleInputChange}
                        >
                          <option value="">Year</option>
                          {generateYears().map((year, index) => (
                            <option key={index} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="">Year</label>
                        {errors.birthday && (
                          <label className="text-red-500">
                            {errors.birthday}
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="label-scinfo">
                    <label htmlFor="">AGE:</label>
                    <div className="label-inputs flex items-center justify-start gap-4">
                      <div className="label-input">
                        <input
                          type="text"
                          name="age"
                          placeholder="ex. 15"
                          value={formData.age || ""} // Ensure it shows the calculated age or an empty string
                          onChange={handleInputChange} // You can leave this in case the user tries to edit the field directly
                          readOnly // Make the field read-only
                          disabled // Makes the field unclickable and non-editable
                        />
                        <label htmlFor=""> ------- </label>
                        {errors.age && (
                          <label className="text-red-500">{errors.age}</label>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="label-scinfo">
                    <label htmlFor="">Civil Status:</label>
                    <div className="label-inputs flex items-center justify-start gap-4">
                      <div className="label-input">
                        <select
                          name="civilStat"
                          value={formData.civilStat}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Civil Status</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Widowed">Widowed</option>
                        </select>
                        <label htmlFor=""> ------- </label>
                        {errors.civilStat && (
                          <label className="text-red-500">
                            {errors.civilStat}
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="label-scinfo">
                    <label htmlFor="">Place of Birth:</label>
                    <div className="label-inputs flex items-center justify-start gap-4">
                      <div className="label-input">
                        <input
                          type="text"
                          name="placeOfBirth"
                          placeholder="ex. Visayas Leyte City"
                          value={formData.placeOfBirth} // Ensure it shows the calculated age or an empty string
                          onChange={handleInputChange} // You can leave this in case the user tries to edit the field directly
                        />
                        <label htmlFor=""> Address Birth </label>
                        {errors.placeOfBirth && (
                          <label className="text-red-500">
                            {errors.placeOfBirth}
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="label-scinfo">
                    <label htmlFor="">GENDER:</label>
                    <div className="label-inputs flex items-center justify-start gap-4">
                      <div className="label-input">
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        <label htmlFor="">Sex</label>
                        {errors.gender && (
                          <label className="text-red-500">
                            {errors.gender}
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="label-scinfo">
                    <label htmlFor="">CONTACT NUMBER:</label>
                    <div className="label-inputs flex items-center justify-start gap-4">
                      <div className="label-input">
                        <input
                          type="text"
                          name="contactNum"
                          placeholder="ex. +09 633 ***"
                          value={formData.contactNum}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="">Tel / Phone No.</label>
                        {errors.contactNum && (
                          <label className="text-red-500">
                            {errors.contactNum}
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="label-scinfo">
                    <label htmlFor="">ADDRESS:</label>
                    <div className="label-inputs flex items-center justify-start gap-4">
                      <div className="label-input">
                        <input
                          type="text"
                          name="address"
                          placeholder="ex. PMS Caloocan City"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="">
                          House Number, Street, and Village Name Only
                        </label>
                        {errors.address && (
                          <label className="text-red-500">
                            {errors.address}
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="button-opt flex items-center justify-center w-full gap-5">
                    <button
                      onClick={(e) => setIsCreateButtonClicked(false)}
                      className="submit-button w-full bg-white text-black py-3"
                    >
                      {" "}
                      Cancel{" "}
                    </button>
                    {/* <button type="submit" className="submit-button w-full bg-violet-600 text-white py-3">Submit</button> */}
                    <button
                      // onClick={handleAddClick}
                      onClick={handleAddClick}
                      className="submit-button w-full bg-violet-600 text-white py-3"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>

              {statusMessage && (
                <div
                  className={`status-message ${
                    isSuccess ? "success" : "error"
                  }`}
                >
                  <p>{statusMessage}</p>
                </div>
              )}

              {/* {statusMessage && (
                                <div className={`status-message ${isSuccess ? 'success' : 'error'}`}>
                                    <p>{statusMessage}</p>
                                </div>
                            )} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SCChapter;
