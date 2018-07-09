import React from "react";
import styles from "./styles.scss";

const Footer = (props, context) => (
  <footer className={styles.footer}>
    <div className={styles.column}>
      <span className={styles.copyright}>© 2018 Yggdrash</span>
    </div>
  </footer>
);

export default Footer;
