import { HeaderModule } from "../../modules/HeaderModule/HeaderModule"
import styles from "./styles/index.module.css"

export const HomePage = () => {
    return(<div className={styles.wrapper}>
        <HeaderModule/>
    </div>)
}