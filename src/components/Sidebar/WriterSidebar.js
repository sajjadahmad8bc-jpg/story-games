import React, { useState } from "react";
import style from "../../components/Sidebar/WriterSidebar.module.css";
import { Nav } from "react-bootstrap";
import { IoReorderThree, IoClose } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdLibraryBooks } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearState } from "../../features/auth/auth.slice";
import WriterMode from "../Pages/ReaderSection3/WriterModal/WriterMode";
import image from "../../assets/profile.png";
import image2 from "../../assets/review.png";
import image3 from "../../assets/applications.png";
import editor from "../../assets/editor.png";
import {
  House,
  Book,
  Heart,
  Envelope,
  QuestionCircle,
  BoxArrowRight,
  Database,
  Pen,
} from "react-bootstrap-icons";

const WriterSidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);
  const role = data?.role || "writer";

  const [isWriterModeOn, setIsWriterModeOn] = useState(false);
  const [showWriterModal, setShowWriterModal] = useState(false);

  const handleSignOut = () => {
    dispatch(clearState());
    localStorage.clear();
    navigate("/editorLogin", { replace: true });
  };
  const handleCloseWriterMode = () => {
    setShowWriterModal(false);
    setIsWriterModeOn(false);
    if (role === "reader") {
    navigate("/readersLanding");
  }

  toggleSidebar();
  };


  // const handleSwitchChange = (e) => {
  //   const checked = e.target.checked;
  //   setIsWriterModeOn(checked);


  //   if (checked && role === "reader") {
  //     setShowWriterModal(true);
  //   } else {
  //     setShowWriterModal(false);
  //   }
  // };
  const handleSwitchChange = (e) => {
    const checked = e.target.checked;
    setIsWriterModeOn(checked);

    if (checked && role === "reader") {
      setShowWriterModal(true);
    } else {
      setShowWriterModal(false);
    }
  };


  return (
    <>

      {isOpen && (
        <div
          className={`${style.sidebarOverlay} d-block d-md-none`}
          onClick={toggleSidebar}
        />
      )}


      <button
        className={`${style.mobileToggle} d-block d-md-none`}
        onClick={toggleSidebar}
      >
        {isOpen ? <IoClose /> : <IoReorderThree />}
      </button>


      <div className={`${style.sidebar} ${isOpen ? style.open : style.closed}`}>

        <div className={style.sidebarTop}>
          <div className={style.sidebarBrand}>
            <span className={style.sidebarTitle}>Story Host</span>
            <div className={style.desktopIcon} onClick={toggleSidebar}>
              <IoReorderThree />
            </div>
          </div>

          <Nav className="flex-column mt-1">
            {/* Links based on role */}
            {role === "writer" && (
              <>
                <Link to="/writerHome" className={style.sidebarLink} onClick={toggleSidebar}>
                  <House className={style.me2} /> <span>Home</span>
                </Link>
                <Link to="/ProfilePage" className={style.sidebarLink} onClick={toggleSidebar}>
                  <img src={image} alt="" /> <span>Profile</span>
                </Link>
                <Link to="/bookpage" className={style.sidebarLink} onClick={toggleSidebar}>
                  <Book className={style.me2} /> <span>Current Novels</span>
                </Link>
                <Link to="/" className={style.sidebarLink} onClick={toggleSidebar}>
                  <img src={editor} alt="" /> <span>Become an Editor</span>
                </Link>
                <Link to="/authorCard" className={style.sidebarLink} onClick={toggleSidebar}>
                  <Heart className={style.me2} /> <span>Favorites</span>
                </Link>
                <Link to="/chatApp" className={style.sidebarLink} onClick={toggleSidebar}>
                  <Envelope className={style.me2} /> <span>Messages</span>
                </Link>
              </>
            )}

            {role === "reader" && (
              <>
                <Link to="/readersLanding" className={style.sidebarLink} onClick={toggleSidebar}>
                  <House className={style.me2} /> <span>Home</span>
                </Link>
                <Link to="/ProfilePage" className={style.sidebarLink} onClick={toggleSidebar}>
                  <img src={image} alt="" /> <span>Profile</span>
                </Link>
                <Link to="/currentNovels" className={style.sidebarLink} onClick={toggleSidebar}>
                  <Book className={style.me2} /> <span>Current Novels</span>
                </Link>
                <Link to="/becomeWriter" className={style.sidebarLink} onClick={toggleSidebar}>
                  <Pen className={style.me2} /> <span>Become a Writer</span>
                </Link>
                <Link to="/tokenStore" className={style.sidebarLink} onClick={toggleSidebar}>
                  <Database className={style.me2} /> <span>Good Read Token Store</span>
                </Link>
                <Link to="/authorCard" className={style.sidebarLink} onClick={toggleSidebar}>
                  <Heart className={style.me2} /> <span>Favorites</span>
                </Link>
              </>
            )}

            {role === "editor" && (
              <>
                <Link to="/writerHome" className={style.sidebarLink} onClick={toggleSidebar}>
                  <House className={style.me2} /> <span>Home</span>
                </Link>
                <Link to="/ProfilePage" className={style.sidebarLink} onClick={toggleSidebar}>
                  <img src={image} alt="" /> <span>Profile</span>
                </Link>
                <Link to="/currentNovels" className={style.sidebarLink} onClick={toggleSidebar}>
                  <Book className={style.me2} /> <span>Current Novels</span>
                </Link>
                <Link to="/" className={style.sidebarLink} onClick={toggleSidebar}>
                  <img src={editor} alt="" /> <span>Become a Producer</span>
                </Link>
                <Link to="/authorCard" className={style.sidebarLink} onClick={toggleSidebar}>
                  <Heart className={style.me2} /> <span>Favorites</span>
                </Link>
                <Link to="/chatApp" className={style.sidebarLink} onClick={toggleSidebar}>
                  <Envelope className={style.me2} /> <span>Messages</span>
                </Link>
              </>
            )}

            {role === "producer" && (
              <>
                <Link to="/producerHome" className={style.sidebarLink} onClick={toggleSidebar}>
                  <House className={style.me2} /> <span>Home</span>
                </Link>
                <Link to="/ProfilePage" className={style.sidebarLink} onClick={toggleSidebar}>
                  <img src={image} alt="" /> <span>Profile</span>
                </Link>
                <Link to="/bookreader" className={style.sidebarLink} onClick={toggleSidebar}>
                  <img src={image2} alt="" /> <span>Review Responses</span>
                </Link>
                <Link to="/applicationpage1" className={style.sidebarLink} onClick={toggleSidebar}>
                  <img src={image3} alt="" /> <span>Open Applications</span>
                </Link>
                <Link to="/chatApp" className={style.sidebarLink} onClick={toggleSidebar}>
                  <Envelope className={style.me2} /> <span>Messages</span>
                </Link>
                <Link to="/authorCard" className={style.sidebarLink} onClick={toggleSidebar}>
                  <Heart className={style.me2} /> <span>Favorites</span>
                </Link>
              </>
            )}
          </Nav>
        </div>


        <div className={style.sidebarBottom}>
          <Nav className="flex-column">

            <div className={`${style.sidebarLink} ${style.readerModeSwitch}`}>
              <div className="form-check form-switch m-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="switchCheckDefault"
                  checked={isWriterModeOn}
                  onChange={handleSwitchChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="switchCheckDefault"
                >
                  {isWriterModeOn ? "Reader mode on" : "Reader mode off"}
                </label>
              </div>
            </div>

            <Nav.Link href="/supportFeedback" className={style.sidebarLink}>
              <QuestionCircle className={style.me2} /> <span>Support</span>
            </Nav.Link>
            <Nav.Link href="/privacypolicypage" className={style.sidebarLink}>
              <SiGnuprivacyguard className={style.me2} /> <span>Privacy Policy</span>
            </Nav.Link>
            <Nav.Link href="/termsconditionspage" className={style.sidebarLink}>
              <MdLibraryBooks className={style.me2} /> <span>Terms & Conditions</span>
            </Nav.Link>

            <Nav.Link onClick={handleSignOut} href="#" className={style.sidebarLink}>
              <BoxArrowRight className={style.me2} />
              <span>Sign Out</span>
            </Nav.Link>
          </Nav>
        </div>
      </div>


      {/* {showWriterModal && role === "reader" && (
        <WriterMode onClose={() => setShowWriterModal(false)} />
      )} */}
      {showWriterModal && role === "reader" && (
        <WriterMode onClose={handleCloseWriterMode} />
      )}

    </>
  );
};

export default WriterSidebar;
