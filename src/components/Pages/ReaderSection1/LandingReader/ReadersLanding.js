import React, { useState, useEffect } from "react";
import { Container, Card, Modal, Button } from "react-bootstrap";
import placeholder from "../../../../assets/Readers-Assets/images/Frame1.png";
import styles from "../../../Pages/ReaderSection1/LandingReader/ReadersLanding.module.css";
import { FaThumbsUp, FaCoins } from "react-icons/fa";
import Character from "../../ReaderSection3/ReaderModal/Character";
import Chapter from "../../ReaderSection3/ReaderModal/Chapter";
import Bookpage from "../../WriterOnlyComponents/Bookpages/Bookpage";
import MemberProfile from "../../ReaderSection3/MemberProfile/MemberProfile";


const sections = [
  "Uploaded",
  "My Favorites",
  "Top 10 Stories",
  "Top 10 Writers",
  "Top 10 Characters",
  "Top 10 Intro Chapters",
];

const generateStories = (sectionName) =>
  Array.from({ length: 10 }, (_, i) => ({
    id: `${sectionName}-${i}`,
    title: `${sectionName} Item ${i + 1}`,
    image: placeholder,
    author: "Author Name",
    writer: "Writer Name",
    book: "Novel Name",
    genre: "Genre",
    character: "Character Name",
    chapterTitle: "Chapter 1: The Beginning",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    chapters: 13,
  }));

const CardContent = ({ section, story }) => {
  if (section === "Top 10 Writers") {
    return (
      <div className={styles.writerPlaceholder}>
        <div className={styles.writerCircle}>
          <img
            src={story.image}
            alt="writer"
            className={styles.writerPlaceholderIcon}
          />
        </div>
        <p className="fw-semibold mt-2 mb-0 small text-dark">Author Name</p>
      </div>
    );
  }
  if (section.includes("Character")) {
    return (
      <div className="p-3">
        <p className="text-muted small mb-1">{story.book}</p>
        <h6 className="fw-bold mb-0">{story.character}</h6>
        <p className="text-primary small mb-0">
          Played & Written by {story.author}
        </p>
      </div>
    );
  }
  if (section.includes("Chapter")) {
    return (
      <div className="p-3">
        <p className="text-muted small mb-1">{story.book}</p>
        <h6 className="fw-bold mb-0">{story.chapterTitle}</h6>
        <p className="text-primary small mb-0">Written by {story.author}</p>
      </div>
    );
  }
  return (
    <div className={styles.placeholderCard}>
      <img src={story.image} alt="placeholder" className={styles.placeholderImg} />
    </div>
  );
};

const ReadersLanding = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [modalShow, setModalShow] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const [characterModal, setCharacterModal] = useState(false);
  const [introChapterModal, setIntroChapterModal] = useState(false);
  const [pageView, setPageView] = useState(null); // null | "book"
 const [selectedWriter, setSelectedWriter] = useState(null)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleCardClick = (story, section) => {
    if (section === "Uploaded" || section === "My Favorites") {
      setSelectedStory(story);
      setModalShow(true);
    } else if (section === "Top 10 Characters") {
      setSelectedStory(story);
      setCharacterModal(true);
    } else if (section === "Top 10 Intro Chapters") {
      setSelectedStory(story);
      setIntroChapterModal(true);
    } else if (section === "Top 10 Writers") {
  setSelectedWriter(story);
  setPageView("member");   
}

  };

  const openBook = () => {
    setPageView("book");
    setCharacterModal(false);
  };

 

  useEffect(() => {
    const handleResize = () => {
      const mobileCheck = window.innerWidth < 992;
      setIsMobile(mobileCheck);
      setSidebarOpen(!mobileCheck);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (pageView === "member") {
  return <MemberProfile writer={selectedWriter} />;
}
  
  if (pageView === "book") {
    return <Bookpage />;
  }
  if (pageView === "member") {
  return <MemberProfile  />;
}


  return (
    <div className="d-flex bg-light vh-90">
      <Container
        fluid
        className={styles.mainContent + " p-4 overflow-auto readers-main"}
        style={{ width: "100%", transition: "margin-left 0.3s ease" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <button
            className="btn btn-light d-lg-none mb-2"
            onClick={toggleSidebar}
            style={{ borderRadius: "50%" }}
          >
            <i className="bi bi-list fs-4"></i>
          </button>
          <h3 className="fw-bold mb-0 me-auto">Home</h3>
          <div className={styles.searchBox + " ms-auto"}>
            <i className="bi bi-search me-2 text-muted"></i>
            <input type="text" placeholder="Search" />
          </div>
        </div>

        {sections.map((section) => (
          <div key={section} className="mb-5">
            <h5 className="fw-bold mb-3">{section}</h5>
            <div className={styles.scrollContainer}>
              {generateStories(section).map((story) => (
                <Card
                  key={story.id}
                  className={`${styles.storyCard} ${
                    section === "Top 10 Writers"
                      ? styles.writerCard
                      : section.includes("Character")
                      ? styles.characterCard
                      : section.includes("Chapter")
                      ? styles.chapterCard
                      : ""
                  }`}
                  onClick={() => handleCardClick(story, section)}
                >
                  <CardContent section={section} story={story} />
                </Card>
              ))}
            </div>
          </div>
        ))}
      </Container>

   
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        centered
      >
        <Modal.Body>
          {selectedStory && (
            <div
              className="d-flex flex-column flex-md-row border rounded overflow-hidden"
              style={{ minHeight: "400px" }}
            >
              <div
                className="d-flex align-items-center justify-content-center bg-light"
                style={{ width: "35%", minHeight: "400px" }}
              >
                <i className="bi bi-image fs-1 text-secondary"></i>
              </div>
              <div className="p-4" style={{ width: "65%", position: "relative" }}>
                <Button
                  variant="light"
                  onClick={() => setModalShow(false)}
                  className="position-absolute"
                  style={{ top: "15px", right: "15px" }}
                >
                  &times;
                </Button>
                <p className="mb-1 text-muted">{selectedStory.genre}</p>
                <h5 className="fw-bold mb-2">{selectedStory.book}</h5>
                <div className="mb-3">
                  <span className="text-primary me-3">{selectedStory.author}</span>
                  <span className="text-primary">{selectedStory.writer}</span>
                </div>
                <p className="text-muted" style={{ lineHeight: "1.5" }}>
                  {selectedStory.description.repeat(2)}
                </p>
                <div
                  className="d-flex"
                  style={{ gap: "20px", fontSize: "0.9rem", marginBottom: "1.5rem" }}
                >
                  <span style={{ color: "gold" }}>
                    <FaThumbsUp /> Likes (5)
                  </span>
                  <span style={{ color: "gold" }}>
                    <FaCoins /> Good Read Tokens (5)
                  </span>
                </div>
                <button
                  className="btn text-white px-4"
                  style={{
                    backgroundColor: "#6f8bda",
                    borderRadius: "25px",
                    fontWeight: "500",
                    width: "100%",
                    height: "50px",
                  }}
                >
                  Read Chapter 1 of {selectedStory.chapters} for Free and Meet the Characters
                  <i className="bi bi-chevron-right fs-6 ms-2"></i>
                </button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

 
      <Modal
        show={characterModal}
        onHide={() => setCharacterModal(false)}
        size="lg"
        centered
      >
        <Modal.Body>
          {selectedStory && (
            <Character
              story={selectedStory}
              onClose={() => setCharacterModal(false)}
              openBook={openBook} 
            />
          )}
        </Modal.Body>
      </Modal>

 
      <Modal
        show={introChapterModal}
        onHide={() => setIntroChapterModal(false)}
        size="lg"
        centered
      >
        <Modal.Body>
          {selectedStory && (
            <Chapter
              story={selectedStory}
              onClose={() => setIntroChapterModal(false)}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReadersLanding;
