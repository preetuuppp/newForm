import React, { useEffect, useState } from "react";
import "../../../Styles/Admin.css";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";
const Admin = () => {
  const [allusers, setallusers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const toast = useToast();
  const getUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://backendform-q7wm.onrender.com/userDetails"
      );
      setallusers(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleInterestToggle = (userId) => {
    setallusers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, interested: !user.interested } : user
      )
    );
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(
        `https://backendform-q7wm.onrender.com/userDetails/${userId}`
      );

      setallusers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );

      toast({
        title: "User Deleted.",

        status: "success",
        duration: 4000,
        position: "top",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (userId) => {
    setEditingRow(userId);

    const userToEdit = allusers.find((user) => user.id === userId);
    setEditedUserData(userToEdit);
  };

  const handleSaveEdit = async (userId) => {
    try {
      await axios.put(
        `https://backendform-q7wm.onrender.com/userDetails/${userId}`,
        editedUserData
      );

      setallusers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? editedUserData : user))
      );

      setEditingRow(null);
      toast({
        title: "User Details Updated.",

        status: "success",
        duration: 4000,
        position: "top",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e, fieldName) => {
    setEditedUserData({
      ...editedUserData,
      [fieldName]: e.target.value,
    });
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "1.8rem",
          marginTop: "7rem",
          fontWeight: "bold",
        }}
      >
        All Users Details
      </h1>
      <div className="table_div">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Services</th>
              <th>Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
            ) : allusers.length > 0 ? (
              allusers.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>
                    {editingRow === contact.id ? (
                      <input
                        type="text"
                        value={editedUserData.name}
                        onChange={(e) => handleInputChange(e, "name")}
                        autoFocus
                      />
                    ) : (
                      contact.name
                    )}
                  </td>
                  <td>
                    {editingRow === contact.id ? (
                      <input
                        type="text"
                        value={editedUserData.mobile}
                        onChange={(e) => handleInputChange(e, "mobile")}
                        autoFocus
                      />
                    ) : (
                      contact.mobile
                    )}
                  </td>
                  <td>
                    {editingRow === contact.id ? (
                      <input
                        type="text"
                        value={editedUserData.email}
                        onChange={(e) => handleInputChange(e, "email")}
                        autoFocus
                      />
                    ) : (
                      contact.email
                    )}
                  </td>
                  <td>
                    {editingRow === contact.id ? (
                      <input
                        type="text"
                        value={editedUserData.service}
                        onChange={(e) => handleInputChange(e, "service")}
                        autoFocus
                      />
                    ) : (
                      contact.service
                    )}
                  </td>
                  <td>
                    <button
                      style={{
                        backgroundColor: contact.interested ? "green" : "red",
                        color: "white",
                        padding: "5px",
                        borderRadius: "5px",
                      }}
                      onClick={() => handleInterestToggle(contact.id)}
                    >
                      {contact.interested ? "Interested" : "Not Interested"}
                    </button>
                  </td>
                  <td>
                    {editingRow === contact.id ? (
                      <button
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                        onClick={() => handleSaveEdit(contact.id)}
                      >
                        Save
                      </button>
                    ) : (
                      <AiTwotoneEdit
                        style={{
                          fontSize: "1.5rem",
                          color: "green",
                        }}
                        onClick={() => handleEditClick(contact.id)}
                      />
                    )}
                  </td>
                  <td>
                    <MdDeleteForever
                      style={{
                        fontSize: "1.5rem",
                        color: "red",
                      }}
                      onClick={() => handleDeleteUser(contact.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No contacts available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
