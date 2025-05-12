import styles from './WebtoonSelector.module.scss'

export const Loader = () => {
    return (
        <div className={styles.container}>
            <div className={styles.spinner} />
        </div>
    )
}
