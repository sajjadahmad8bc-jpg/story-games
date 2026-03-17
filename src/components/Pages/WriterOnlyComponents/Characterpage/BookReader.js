import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiHeart, FiAward, FiPlay, FiSquare } from 'react-icons/fi';
import styles from "../../WriterOnlyComponents/Characterpage/BookReader.module.css"
import ReaderModalFlow from "../../ReaderSection3/ReaderModal/ReaderModalFlow"
export default function BookReader() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showAwardModal, setShowAwardModal] = useState(false);

  const bookData = {
    title: "Book Name",
    chapter: "1.1 Character One",
    sections: [
      {
        title: "1.1.1. Chapter 1",
        content: [
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugiat nulla facilisi.",
          "Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.",
          "Euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugiat nulla facilisi."
        ],
        image: true
      }
    ]
  };

  const totalPages = 20;

  const goToNextPage = () => {
    if (currentPage < totalPages - 2) {
      setCurrentPage(currentPage + 2);
    }
  };
 

  return (
    <div className={`${styles.wrapper} d-flex justify-content-center align-items-center`}>
      <div className={`${styles.bookContainer} bg-white rounded shadow-lg overflow-hidden`}>
        {showAwardModal && (
          <ReaderModalFlow onClose={() => setShowAwardModal(false)} />
        )}
        <div className={`${styles.header} bg-white border-bottom d-flex justify-content-between align-items-center px-4 py-3`}>
          <div className="d-flex align-items-center gap-3">

            <button
              className={`btn btn-primary ${styles.navBtn}`}
              disabled={currentPage === 0}
            >
              <FiChevronLeft size={20} />
            </button>
            <h1 className={`${styles.title} fw-bold mb-0`}>
              {bookData.title} • {bookData.chapter}
            </h1>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button
              onClick={() => setShowAwardModal(true)}
              className={`btn btn-primary d-flex align-items-center gap-2 ${styles.awardBtn}`}
            >
              <FiAward size={16} />
              Award Good Read Token
            </button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`btn ${isLiked ? styles.likedBtn : styles.likeBtn}`}
            >
              <FiHeart size={20} fill={isLiked ? '#ef4444' : 'none'} color={isLiked ? '#ef4444' : '#6b7280'} />
            </button>
          </div>
        </div>

        <div className="row g-0">
          <div className={`col-6 ${styles.leftPage} position-relative`}>
            <div className={styles.pageContent}>
              <h2 className={`${styles.chapterTitle} fw-bold mb-4`}>
                {bookData.sections[0].title}
              </h2>
              <div className={styles.textContent}>
                {bookData.sections[0].content.map((paragraph, idx) => (
                  <p key={idx} className={styles.paragraph}>
                    {paragraph}
                  </p>
                ))}
                <p className={styles.paragraph}>
                  Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                </p>
              </div>
              <div className={styles.pageNumber}>
                Page {currentPage + 1} of {totalPages}
              </div>
            </div>
          </div>

          <div className={`col-6 ${styles.rightPage} position-relative`}>
            <div className={styles.pageContent}>
              <div className={styles.textContent}>
                <p className={styles.paragraph}>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugiat nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit.
                </p>
              </div>

              <div className={`${styles.imageContainer} my-4`}>
                <div className={`${styles.imagePlaceholder} bg-light rounded d-flex justify-content-center align-items-center`}>
                  <div className="text-center">
                    <div className={`${styles.iconCircle} bg-secondary rounded-circle mx-auto mb-2 d-flex justify-content-center align-items-center`}>
                      <div className={styles.innerCircle}></div>
                    </div>
                    <p className={`${styles.imageCaption} text-muted fst-italic mb-0`}>Lorem Ipsum, dor sit amet</p>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <button
                  onClick={() => setIsSoundPlaying(!isSoundPlaying)}
                  className={`btn w-100 d-flex align-items-center justify-content-center gap-2 ${isSoundPlaying ? styles.stopBtn : styles.playBtn}`}
                >
                  {isSoundPlaying ? (
                    <>
                      <FiSquare size={16} />
                      Stop sound effects
                    </>
                  ) : (
                    <>
                      <FiPlay size={16} />
                      Play sound effects
                    </>
                  )}
                </button>
              </div>

              <div className={styles.textContent}>
                <p className={styles.paragraph}>
                  Euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugiat nulla facilisi.
                </p>
                <p className={styles.paragraph}>
                  Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </p>
              </div>

              <div className={styles.pageNumber}>
                Page {currentPage + 2} of {totalPages}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={goToNextPage}
          disabled={currentPage >= totalPages - 2}
          className={`${styles.floatingBtn} btn btn-primary rounded-circle shadow-lg position-fixed`}
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}