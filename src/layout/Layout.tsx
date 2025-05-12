import { Webtoon, WebtoonSelector } from '@/components'
import styles from './Layout.module.scss'
import { TopButton } from '@/components/TopButton/TopButton'
export const Layout = () => {
    return (
        <>
            <main className={styles.main}>
                <WebtoonSelector />
                <Webtoon />
            </main>
            <TopButton />
        </>
    )
}
