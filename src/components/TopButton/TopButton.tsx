import { ArrowUp } from 'lucide-react'
import styles from './TopButton.module.scss'

export const TopButton = () => {
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    return (
        <button
            className={styles.button}
            onClick={handleClick}
        >
            <span>
                <ArrowUp />
            </span>
        </button>
    )
}
