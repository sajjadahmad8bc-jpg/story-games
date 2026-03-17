import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaUser,
  FaUpload,
  FaLock,
  FaPen,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Database } from "react-bootstrap-icons";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "user_name01",
    aboutMe: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Load logged-in user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setLoggedUser(parsed);
      setFormData((prev) => ({
        ...prev,
        email: parsed.email || prev.email,
        username: parsed.username || prev.username,
        aboutMe: parsed.aboutMe || prev.aboutMe,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle password update with API
  const handlePasswordUpdate = async () => {
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill all password fields!");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New and confirm passwords do not match!");
      return;
    }
    if (!loggedUser) {
      alert("No user is logged in!");
      return;
    }

    try {
      const res = await fetch("https://68c02ee30b196b9ce1c3870f.mockapi.io/crud");
      const users = await res.json();

      const currentUser = users.find(
        (u) => u.email === loggedUser.email && u.role === loggedUser.role
      );

      if (!currentUser) return alert("User not found in database!");
      if (currentUser.password !== oldPassword)
        return alert("Old password is incorrect!");

      const updateRes = await fetch(
        `https://68c02ee30b196b9ce1c3870f.mockapi.io/crud/${currentUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...currentUser, password: newPassword }),
        }
      );

      if (updateRes.ok) {
        alert("Password updated successfully! Redirecting to login...");
        setFormData({
          email: loggedUser.email,
          username: loggedUser.username,
          aboutMe: loggedUser.aboutMe,
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => {
          navigate("/editorLogin");
        }, 2000);
        localStorage.removeItem("user");
        setLoggedUser(null);
      } else alert("Failed to update password!");
    } catch (error) {
      console.error(error);
      alert("Error connecting to API!");
    }
  };

  return (
    <div className={`container-fluid ${styles.pageWrapper}`}>
      <div className={`card shadow p-4 border-0 ${styles.card}`}>
        <h1 className={`${styles.header} mb-2`}>My Profile</h1>
        <div className={styles.divider}></div>

        <div className="row g-3 mb-4">
          <div className="col-12 col-md-2">
            <div className={`${styles.giftCard}`}>
              <div className={styles.giftLabel}>Available Gift</div>
              <div className={styles.giftAmount}>
                <Database className={styles.coinIcon} /> 100
              </div>
            </div>
          </div>
          <div className="col-12 col-md-2">
            <div className={`${styles.giftCard}`}>
              <div className={styles.giftLabel}>Given Out Gift</div>
              <div className={styles.giftAmount}>
                <Database className={styles.coinIcon} /> 100
              </div>
            </div>
          </div>
        </div>

        <h2 className={`${styles.sectionTitle} mb-3`}>Basic Information</h2>
        <div className="row g-3 mb-3">
          <div className="col-12 col-md-6 position-relative">
            <FaEnvelope size={18} className={styles.inputIcon} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control ps-5"
              disabled
            />
          </div>
          <div className="col-12 col-md-6 position-relative">
            <FaUser size={18} className={styles.inputIcon} />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="form-control ps-5"
            />
          </div>
        </div>
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6 position-relative">
            <FaPen size={18} className={styles.penicon} />
            <textarea
              name="aboutMe"
              placeholder="About Me"
              value={formData.aboutMe}
              onChange={handleInputChange}
              className="form-control ps-5"
              rows="3"
            />
          </div>
          <div className="col-12 col-md-6">
            <div
              className={`${styles.uploadBox}`}
              onClick={() => alert("Upload functionality would go here")}
            >
              <FaUpload size={24} className={styles.uploadIcon} />
              <div className={styles.uploadText}>Upload Profile Picture</div>
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className={`${styles.passwordSection} mb-4`}>
          <h2 className={`${styles.sectionTitle} mb-3`}>Password</h2>
          <div className="position-relative mb-3">
            <FaLock size={18} className={styles.inputIcon} />
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              placeholder="Enter Old Password"
              value={formData.oldPassword}
              onChange={handleInputChange}
              className="form-control ps-5"
            />
            <div
              className={styles.eyeIcon}
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </div>
          </div>

          <div className="row g-3">
            <div className="col-12 col-md-6 position-relative">
              <FaLock size={18} className={styles.inputIcon} />
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Create New Password"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="form-control ps-5"
              />
              <div
                className={styles.eyeIcon}
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 position-relative">
              <FaLock size={18} className={styles.inputIcon} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="form-control ps-5"
              />
              <div
                className={styles.eyeIcon}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </div>
            </div>
          </div>
          <button
            className={`btn btn-primary mt-3 ${styles.primaryButton}`}
            onClick={handlePasswordUpdate}
          >
            Update Password
          </button>
        </div>

        {/* Bank Account Section */}
        <div className={`${styles.bankSection} mb-4`}>
          <h2 className={`${styles.sectionTitle} mb-3`}>Bank Account</h2>
          <button
            className={`btn btn-outline-primary ${styles.secondaryButton}`}
            onClick={() => navigate("/LinkBankAccount")}
          >
            Link Bank Account
          </button>
        </div>

        {/* Update Profile Button */}
        <div className="d-grid">
          <button
            className={`btn btn-warning text-white fw-semibold ${styles.updateButton}`}
            onClick={() => alert("Link your bank account")}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
