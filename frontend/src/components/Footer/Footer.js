import React from "react";
import { FaTelegram } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer
      id="contactUS"
      className={`${styles.footerBackground} ${styles.footerBottom}`}
      style={{
        backgroundColor: '#0e3f70',
        backgroundImage: `url('assets/img/footer_bg.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '40px 0',
      }}
    >
      <div className={`${styles.footerContainer} ${styles.paddingTop} ${styles.paddingBottom}`}>
        <div className={styles.innerContainer}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={`${styles.footerSection} ${styles.marginBottom}`}>
                <div className={`${styles.footerSectionTitle} ${styles.marginBottomSmall}`}>
                  <h3 className={styles.footerTitle}>About</h3>
                </div>
                <div className={styles.footerLinks}>
                  <ul className={styles.linkList}>
                    <li className={styles.linkItem}><a href="/" className={styles.link}>Home</a></li>
                    <li className={styles.linkItem}><a href="/courses" className={styles.link}>Courses</a></li>
                    <li className={styles.linkItem}><a href="/about" className={styles.link}>Testimonial</a></li>
                    <li className={styles.linkItem}><a href="/about" className={styles.link}>About Us</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.column}>
              <div className={`${styles.footerSection} ${styles.marginBottom}`}>
                <div className={`${styles.footerSectionTitle} ${styles.marginBottomSmall}`}>
                  <h3 className={styles.footerTitle}>Contact Us</h3>
                </div>
                <div className={styles.footerLinks}>
                  <ul className={styles.linkList}>
                    <li className={styles.linkItem}><a href="https://wa.me/9281488820" target="_blank" rel="noopener noreferrer" className={styles.link}>Whatsapp</a></li>
                    <li className={styles.linkItem}><a href="https://t.me/Abhi_1747" target="_blank" rel="noopener noreferrer" className={styles.link}>Telegram</a></li>
                    <li className={styles.linkItem}><a href="mailto:abhitranings888@gmail.com" target="_blank" rel="noopener noreferrer" className={styles.link}>Email</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.column}>
              <div className={`${styles.footerSection} ${styles.marginBottom}`}>
                <div className={`${styles.footerSectionTitle} ${styles.marginBottomSmall}`}>
                  <h3 className={styles.footerTitle}>Quick Links</h3>
                </div>
                <div className={styles.footerLinks}>
                  <ul className={styles.linkList}>
                    <li className={styles.linkItem}><a href="https://drive.google.com/file/d/1WInpwE0Hu6VefnCiJvQV2EtXQARU5OCM/view?usp=drivesdk" target="_blank" rel="noopener noreferrer" className={styles.link}>Demo Class</a></li>
                    <li className={styles.linkItem}><a href="#instructor" className={styles.link}>Introduction</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.column}>
              <div className={`${styles.footerSection} ${styles.marginBottom}`}>
                <div className={`${styles.footerSectionTitle} ${styles.marginBottomSmall}`}>
                  <h3 className={styles.footerTitle}>Support</h3>
                </div>
                <p className={styles.footerDescription}>
                  Be the first to know about discounts, offers, and events. Unsubscribe whenever you like.
                </p>
                <div className={styles.socialLinks}>
                  <a href="https://t.me/Abhi_1747" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink}><FaTelegram className={styles.socialIcon}/></a>
                  <a href="https://wa.me/9281488820" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink}><RiWhatsappFill className={styles.socialIcon}/></a>
                  <a href="mailto:abhitranings888@gmail.com" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink}><MdOutlineAlternateEmail className={styles.socialIcon}/></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.footerCopyright} ${styles.paddingTopSmall} ${styles.paddingBottomSmall}`}>
        <div className={` ${styles.innerContainer}`}>
          <div className={` ${styles.innerContainerCopyright} ${styles.row}`}>
            <div className={styles.logoColumn}>
              <div className={styles.footerLogo}>
                <h2 className={styles.logoTextLink}><a href="/" className={styles.logoText}>Abhi Trainings</a></h2>
              </div>
            </div>
            <div className={styles.copyrightColumn}>
              <div className={`${styles.footerCopyrightText} ${styles.textEnd}`}>
                <p className={styles.copyrightText}>Copyright <strong>©</strong> Abhi Trainings 2024</p>
                  <p className={styles.copyrightText}>All Rights Reserved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
