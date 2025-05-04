import notFoundPic from "../../assets/img/notFound.jpg";
import styles from "../NotFoundBlock/NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>Ничего не найдено 😢</h1>
      <img className={styles.notFoundPic} src={notFoundPic} alt="notFound" />
    </div>
  );
};

export default NotFoundBlock;
