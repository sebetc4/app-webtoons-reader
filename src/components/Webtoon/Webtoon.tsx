import { useWebtoonStore } from '@/store'
import styles from './Webtoon.module.scss'
import { apiService } from '@/service'
import { ChapterNavigation } from './components'

export const Webtoon = () => {
    const name = useWebtoonStore((state) => state.name)
    const currentChapter = useWebtoonStore((state) => state.currentChapter)
    const totalImages = useWebtoonStore((state) => state.totalImages)
    return (
        <div className={styles.container}>
            <ChapterNavigation />
            <section className={styles.section}>
                <h1 className={styles.title}>{name}</h1>
                {Array.from({ length: totalImages }, (_, index) => (
                    <img
                        key={index}
                        src={apiService.getImageUrl(name, currentChapter, index + 1)}
                        alt={`Image ${index + 1}`}
                        className={styles.image}
                    />
                ))}
            </section>
        </div>
    )
}
