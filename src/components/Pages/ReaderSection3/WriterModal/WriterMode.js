import React from "react";
import styles from "./WriterModal.module.css";
import writerImage from "../../../../assets/Readers-Assets/images/Frame (2).png";

function WriterMode({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>

        <div className={styles.iconWrapper}>
          <img
            src={writerImage}
            alt="Writer Mode"
            className={styles.writerImage}
          />
        </div>

        <h5>Writer Mode Not Active</h5>
        <button className={styles.primaryBtn}>Become a Writer</button>
      </div>
    </div>
  );
}

export default WriterMode;
