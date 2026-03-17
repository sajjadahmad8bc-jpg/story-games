import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card } from "react-bootstrap";
import style from "../../../components/Pages/WriterOnlyComponents/WriterHome.module.css";
import { CommonModal } from "../../Modal/Common-Modal/Modal1";
import Modalsetup2 from "../../Modal/Common-Modal/Modalsetup2";
import Modalsetup1 from "../../Modal/Common-Modal/Modalsetup1";
import Modal3 from "../../Modal/Common-Modal/Modal3";
import defaultImage from "../../../assets/icon.png";
import { Link } from "react-router-dom";
import { fetchBooks } from "../../../features/auth/writerslice";

const WriterHome = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.writer);

  const [openModal, setOpenModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [componentIndex, setcomponentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const steps = useMemo(() => {
    return componentIndex === 0 ? (
      <Modalsetup1
        onHide={() => {
          setOpenModal(false);
          setcomponentIndex(0);
        }}
        selectedBook={selectedBook}
        setcomponentIndex={setcomponentIndex}
      />
    ) : componentIndex === 1 ? (
      <Modalsetup2
        onHide={() => {
          setOpenModal(false);
          setcomponentIndex(0);
        }}
        setcomponentIndex={setcomponentIndex}
      />
    ) : componentIndex === 2 ? (
      <Modal3
        onHide={() => {
          setOpenModal(false);
          setcomponentIndex(0);
        }}
        selectedBook={selectedBook}
        setcomponentIndex={setcomponentIndex}
      />
    ) : null;
  }, [componentIndex, selectedBook]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container">

       
      <div className={style.headerContainer}>
        <h3 className={style.homeHeading}>Home</h3>

        <div className={style.searchBox}>
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Search" />
        </div>
       
      </div>
      <div className={style.divider}></div>
    
      <section className="section">
        <h5 className={style.sectionTitle}>Open Adverts</h5>
        <Row className={style.cardsRow}>
          {books.slice(0, 10).map((book) => (
            <Col key={book.id} xs={4} sm={3} md={2} lg={2} xl={2} className="mb-3">
              <div
                className={style.placeholderCard}
                onClick={() => {
                  setSelectedBook(book);
                  setOpenModal(true);
                }}
              >
                <img
                  src={book.image || defaultImage}
                  alt={book.title}
                  className={style.cardIcon}
                />
              </div>
            </Col>
          ))}
        </Row>
      </section>

     
      <section className="section">
        <h5 className={style.sectionTitle}>Current Applications</h5>
        <Row className={style.cardsRow}>
          {books.slice(10, 20).map((book) => (
            <Col key={book.id} xs={4} sm={3} md={2} lg={2} xl={2} className="mb-3">
              <div
                className={style.placeholderCard}
                onClick={() => {
                  setSelectedBook(book);
                  setOpenModal(true);
                }}
              >
                <img
                  src={book.image || defaultImage}
                  alt={book.title}
                  className={style.cardIcon}
                />
              </div>
            </Col>
          ))}
        </Row>
      </section>


      <section className="section">
        <h5 className={style.sectionTitle}>Available Workrooms</h5>
        <Row className="g-3">
          {books.slice(0, 3).map((book) => (
            <Col key={book.id} xs={12} sm={6} md={4} lg={4} xl={4}>
              <div className={`${style.cardCustom} shadow-sm`}>
                <div className={style.imagePlaceholder}>
                  <img
                    src={book.image || defaultImage}
                    alt={book.title}
                    className={style.workroomImage}
                  />
                </div>
                <Card.Body className={style.cardBody}>
                  <Card.Title className="fw-bold h6">{book.title}</Card.Title>
                  <Link to="/workRoom" className={style.setlink}>
                    Enter Workroom
                  </Link>
                </Card.Body>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      {openModal && (
        <CommonModal
          bodyClasses={componentIndex === 1 && style.secondStep}
          show={openModal}
        >
          {steps}
        </CommonModal>
      )}
    </div>
  );
};

export default WriterHome;
