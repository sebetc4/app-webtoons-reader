import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './ChapterNavigation.module.scss'
import { useWebtoonStore } from '@/store'

export const ChapterNavigation = () => {
    const currentChapter = useWebtoonStore((state) => state.currentChapter)
    const totalChapters = useWebtoonStore((state) => state.totalChapters)
    const setCurrentChapter = useWebtoonStore((state) => state.setCurrentChapter)
    return (
        <div className={styles.container}>
            <button
                className={styles.button}
                onClick={() => setCurrentChapter(currentChapter - 1)}
                disabled={currentChapter === 1}
            >
                <ChevronLeft />
                Previous
            </button>
            <span>Chapitre {currentChapter}/{totalChapters}</span>
            <button
                className={styles.button}
                onClick={() => {
                    setCurrentChapter(currentChapter + 1)
                }}
            >
                Next
                <ChevronRight />
            </button>
        </div>
    )
}
