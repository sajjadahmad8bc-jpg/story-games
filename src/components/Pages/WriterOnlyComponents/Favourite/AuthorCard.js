import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../WriterOnlyComponents/Favourite/Autho.module.css";
import Modalsetup4 from "../../../Modal/Common-Modal/Modalsetup4";
import { CommonModal } from "../../../Modal/Common-Modal/Modal1";
import { fetchFavourite, fetchBooks } from "../../../../features/auth/writerslice";

// Author Card Component
const AuthorCard = ({ name, image }) => (
  <div className="text-center">
    <div className={`mx-auto mb-2 border rounded-circle d-flex align-items-center justify-content-center bg-light ${styles.iconCircle}`}>
      <img src={image} alt={name} className={`${styles.iconImage} img-fluid rounded-circle`} />
    </div>
    <div className="small fw-medium text-dark text-truncate px-1">{name}</div>
  </div>
);

// Adventure Log Card Component
const LogCard = ({ image }) => (
  <div className={`rounded shadow-sm d-flex align-items-center justify-content-center bg-light ${styles.logCard}`}>
    <img src={image} alt="Adventure Log" className={`${styles.logImage} img-fluid rounded`} />
  </div>
);

const FavoritesPage = () => {
  const [activeTab, setActiveTab] = useState("authors");
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedWorkRoom, setSelectedWorkRoom] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavourite());
    dispatch(fetchBooks());
  }, [dispatch]);

  const favourites = useSelector((state) => state.writer.favourite || []);
  const books = useSelector((state) => state.writer.books || []);

  const adventureLogs = useMemo(() => 
    books.map((book) => ({
      id: book.id,
      image: book.image,
      bookData: book 
    })), [books]
  );

  const filteredAuthors = useMemo(() =>
    Array.isArray(favourites)
      ? favourites.filter((a) =>
          a.Authorname?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [], [searchTerm, favourites]
  );

  return (
    <div className="container-fluid p-3 p-md-4 p-lg-5">
      <div className="favoritesHeaderWrapper d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h1 className={styles.homeHeading}>Favourites</h1>
          <div className="position-relative">
            <input
              type="text"
              className="form-control ps-5 py-2"
              placeholder="Search authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ backgroundColor: "#f0f0f0", border: "1px solid #ced4da" }}
            />
            <i className={`bi bi-search position-absolute ${styles.searchIcon}`}></i>
          </div>
        </div>

        <div className={styles.divider}></div>
      </div>

      
      <ul className="nav nav-tabs mb-3 mb-md-4 border-0">
        <li className="nav-item me-3">
          <button
            className={`nav-link fw-semibold border-0 px-0 pb-2 ${activeTab === "authors" ? styles.activeTab : styles.inactiveTab}`}
            onClick={() => setActiveTab("authors")}
          >
            Authors
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-semibold border-0 px-0 pb-2 ${activeTab === "adventure-logs" ? styles.activeTab : styles.inactiveTab}`}
            onClick={() => setActiveTab("adventure-logs")}
          >
            Adventure Logs
          </button>
        </li>
      </ul>

      {/* Cards */}
      <div className="container-fluid px-0">
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-2 g-md-3">
          
          {activeTab === "authors" && (
            filteredAuthors.length > 0 ? (
              filteredAuthors.map((item, index) => (
                <div key={`${item.id}-${index}`} className="col d-flex justify-content-center">
                  <div className="w-100">
                    <AuthorCard name={item.Authorname} image={item.images} />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center text-muted py-4 py-md-5">
                <i className="bi bi-person-x fs-1 d-block mb-2"></i>
                No favorite authors found.
              </div>
            )
          )}

          {activeTab === "adventure-logs" && (
            adventureLogs.length > 0 ? (
              adventureLogs.map((log) => (
                <div
                  key={log.id}
                  className="col d-flex justify-content-center"
                  onClick={() => {
                    setOpenModal(true);
                    setSelectedWorkRoom(log.bookData);
                  }}
                >
                  <div className="w-100">
                    <LogCard image={log.image} />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center text-muted py-4 py-md-5">
                <i className="bi bi-image fs-1 d-block mb-2"></i>
                No adventure logs found.
              </div>
            )
          )}

        </div>
      </div>

  
      {openModal && (
        <CommonModal
          show={openModal}
          selectedWorkRoom={selectedWorkRoom}
          onHide={() => setOpenModal(false)}
        >
          <Modalsetup4 
            onHide={() => setOpenModal(false)}
            bookData={selectedWorkRoom}
          />
        </CommonModal>
      )}

    </div>
  );
};

export default FavoritesPage;
