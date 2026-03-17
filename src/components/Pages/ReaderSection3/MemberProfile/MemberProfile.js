import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import {
  FaArrowLeft,
  FaRegHeart,
  FaThumbsUp,
  FaCoins,
  FaRegImage,
} from "react-icons/fa";
import styles from "./MemberProfile.module.css";
 import rightImage from "../../../../assets/Readers-Assets/images/Frame.png";
 import iconimage from "../../../../assets/icon.png";
const novels = [
  { id: 1, title: "Novel Name", likes: 5, tokens: 5 },
  { id: 2, title: "Novel Name", likes: 5, tokens: 5 },
  { id: 3, title: "Novel Name", likes: 5, tokens: 5 },
];
export default function MemberProfile() {
  return (
    <Container fluid className={styles.pageWrap}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn}>
            <FaArrowLeft />
          </button>
          <h2 className={styles.headerTitle}>Member Profile</h2>
        </div>
        <button className={styles.favBtn}>
          <FaRegHeart />
        </button>
      </div>
      <div className={styles.aboutContainer}>
        <Row className="align-items-center justify-content-between">
          <Col md={3} className="d-flex flex-column align-items-center">
            <div className={styles.outerCircle}>
              <div className={styles.innerCircle}>
                <FaRegImage className={styles.imageIcon} />
              </div>
            </div>
            <p className={styles.authorName}>Author Name</p>
          </Col>
          <Col md={6}>
            <div className={styles.aboutText}>
              <h4>About Me</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam
                nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
                erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                consequat. Duis autem vel eum iriure dolor in hendrerit in
                vulputate velit esse molestie consequat.
              </p>
            </div>
          </Col>
          <Col md={3} className="text-center">
            <img
              src={rightImage}
              alt="Illustration"
              className={styles.rightImage}
            />
          </Col>
        </Row>
      </div>
      <div className={styles.featuredSection}>
        <h5 className={styles.featuredTitle}>Featured Novels</h5>
       <Row className="g-4 row-cols-1 row-cols-md-2">

          {novels.map((n) => (
            <Col key={n.id} md={4}>
              <div className={styles.featureCard}>
                 
                <div className={styles.imageBlock}>
                  <img 
                src={iconimage}
                alt="Illustration"
                className={styles.iconimage}
                />
                </div>
                
              
                <Card className={styles.cardBody}>
                  <Card.Body>
                    <div className={styles.cardHeader}>
                      <h6 className={styles.novelTitle}>{n.title}</h6>
                      <FaRegHeart className={styles.heartIcon} />
                    </div>
                    <p className={styles.novelDesc}>
                      Tempor sed lectus mauris luctus euismod. At tristique sed ut
                      suspendisse nam. Malesuada magna.
                    </p>
                    <div className={styles.statsRow}>
                      <span>
                        <FaThumbsUp /> Likes ({n.likes})
                      </span>
                      <span>
                        <FaCoins /> Good Read Tokens ({n.tokens})
                      </span>
                    </div>
                    <Button variant="link" className={styles.readBtn}>
                      Read Novel &rsaquo;
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}