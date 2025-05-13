import styles from './Chapter.module.scss'
import { useWebtoonStore } from '@/store'

export const Chapter = () => {
    const images = useWebtoonStore((state) => state.chapterImages)

    return (
        <section className={styles.section}>
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                />
            ))}
        </section>
    )
}
