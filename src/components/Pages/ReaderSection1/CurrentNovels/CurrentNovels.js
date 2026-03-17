import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import placeholder from "../../../../assets/Readers-Assets/images.png";
import styles from "./CurrentNovels.module.css";
import { CommonModal } from "../../../Modal/Common-Modal/Modal1";
import Modalsetup4 from "../../../Modal/Common-Modal/Modalsetup4";

const CurrentNovels = () => {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedNovel, setSelectedNovel] = useState(null);

  const fetchNovels = async () => {
    try {
      const response = await fetch("http://localhost:3000/books"); 
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setNovels(data);
      } else {
        setNovels([]);
      }
    } catch (error) {
      console.error("Error fetching novels:", error);
      setNovels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNovels();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h3>Loading novels...</h3>
      </div>
    );
  }

  return (
    <div className="d-flex bg-light vh-100">
      <Container
        fluid
        className={styles.mainContent}
        style={{ marginLeft: "0px", transition: "margin-left 0.3s ease" }}
      >
        <div
          className={`d-flex justify-content-between align-items-center flex-wrap ${styles.headerNav}`}
        >
          <h3 className="fw-bold mb-0 me-auto">Current Novels</h3>

          <div className={styles.searchBox + " ms-auto"}>
            <i className="bi bi-search me-2 text-muted"></i>
            <input type="text" placeholder="Search" />
          </div>
        </div>

        <div className={styles.containerGrid}>
          {novels.length > 0 ? (
            novels.map((novel) => (
              <Card
                key={novel.id}
                className={styles.novelCard}
                onClick={() => {
                  setSelectedNovel(novel);
                  setOpenModal(true);
                }}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={novel.image || placeholder}
                  alt={novel.title}
                  className={styles.novelImage}
                />
              </Card>
            ))
          ) : (
            <div className="text-center py-4">No novels found.</div>
          )}
        </div>
      </Container>

      {/* Modal */}
      {openModal && selectedNovel && (
        <CommonModal
          show={openModal}
          selectedWorkRoom={selectedNovel}
          onHide={() => setOpenModal(false)}
        >
          <Modalsetup4 
            onHide={() => setOpenModal(false)}
            bookData={selectedNovel}
          />
        </CommonModal>
      )}
    </div>
  );
};

export default CurrentNovels;
