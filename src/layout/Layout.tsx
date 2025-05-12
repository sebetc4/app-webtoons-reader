import styles from './Layout.module.scss'
import { Webtoon, WebtoonSelector } from '@/components'
import { TopButton } from '@/components/TopButton/TopButton'
import { useWebtoonStore } from '@/store'
import { Loader } from 'lucide-react'

export const Layout = () => {
    const isLoading = useWebtoonStore((state) => state.isLoading)
    return (
        <>
            <main className={styles.main}>
                <WebtoonSelector />
                {isLoading ? <Loader /> : <Webtoon />}
            </main>
            <TopButton />
        </>
    )
}
