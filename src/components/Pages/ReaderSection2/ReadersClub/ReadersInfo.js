import React, { useState } from "react";
import styles from "./ReadersInfo.module.css";
import illustration from "../../../../assets/Readers-Assets/images/Group.png";


import { MdEmail } from "react-icons/md";
import { FaUser, FaLock } from "react-icons/fa";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ReadersInfo = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    referringId: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };





  return (
    <div className={styles.modalContainer}>
      <div className={styles.formCard}>
       

       
        <div className={styles.illustrationContainer}>
          <img
            src={illustration}
            alt="Illustration"
            className={styles.formIllustration}
          />
        </div>

     
        <h2 className={styles.formTitle}>Add Your Information</h2>

        <form className={styles.infoForm} onSubmit={handleSubmit}>
       
          <div className={styles.inputGroup}>
            <span className={styles.inputIcon}>
              <MdEmail />
            </span>
            <input
              type="email"
              placeholder="Enter Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

        
          <div className={styles.inputGroup}>
            <span className={styles.inputIcon}>
              <FaUser />
            </span>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

       
          <div className={styles.inputGroup}>
            <span className={styles.inputIcon}>
              <FaUser />
            </span>
            <input
              type="text"
              placeholder="Referring Member ID"
              name="referringId"
              value={formData.referringId}
              onChange={handleInputChange}
            />
          </div>

     
          <div className={`${styles.inputGroup} ${styles.passwordGroup}`}>
            <span className={styles.inputIcon}>
              <FaLock />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <span
              className={styles.togglePasswordImg}
              onClick={() => setShowPassword((s) => !s)}
              role="button"
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>

       
          <div className={`${styles.inputGroup} ${styles.passwordGroup}`}>
            <span className={styles.inputIcon}>
              <FaLock />
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <span
              className={styles.togglePasswordImg}
              onClick={() => setShowConfirmPassword((s) => !s)}
              role="button"
            >
              {showConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>

          <button type="submit" className={styles.submitButton}>
            Proceed To Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReadersInfo;
