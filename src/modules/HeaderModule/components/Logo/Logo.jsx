import logo from "../../../../assets/images/pioner.png"
import styles from "./styles/index.module.css"

export const Logo = () => {
    return(<div className={styles.logo}>
        <img src={logo} alt="Пионер - Российский завод силовых машин" />
    </div>)
}