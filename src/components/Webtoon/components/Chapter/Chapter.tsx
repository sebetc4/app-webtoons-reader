import styles from './Chapter.module.scss'
import { apiService } from '@/service'
import { useWebtoonStore } from '@/store'

export const Chapter = () => {
    const name = useWebtoonStore((state) => state.name)
    const currentChapter = useWebtoonStore((state) => state.currentChapter)
    const totalImages = useWebtoonStore((state) => state.totalImages)

    return (
        <section className={styles.section}>
            {Array.from({ length: totalImages }, (_, index) => (
                <img
                    key={index}
                    src={apiService.getImageUrl(name, currentChapter, index + 1)}
                    alt={`Image ${index + 1}`}
                />
            ))}
        </section>
    )
}
