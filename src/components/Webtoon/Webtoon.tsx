import { useWebtoonStore } from '@/store'
import styles from './Webtoon.module.scss'
import { Chapter, ChapterNavigation } from './components'

export const Webtoon = () => {
    const name = useWebtoonStore((state) => state.name)

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{name}</h1>
            <ChapterNavigation />
            <Chapter />
        </div>
    )
}
