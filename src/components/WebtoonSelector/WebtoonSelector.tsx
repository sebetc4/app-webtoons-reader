import styles from './WebtoonSelector.module.scss'
import { useWebtoonStore } from '@/store/webtoon.store'

export const WebtoonSelector = () => {
    const name = useWebtoonStore((state) => state.name)
    const setName = useWebtoonStore((state) => state.setName)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value
        if (newName !== name) setName(newName)
    }

    return (
        <input
            className={styles.input}
            type='text'
            onChange={handleChange}
            value={name}
        />
    )
}
