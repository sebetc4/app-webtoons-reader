import { useState } from 'react'
import styles from './WebtoonSelector.module.scss'
import { useWebtoonStore } from '@/store/webtoon.store'
import { apiService } from '@/service'

export const WebtoonSelector = () => {
    const name = useWebtoonStore((state) => state.name)
    const setName = useWebtoonStore((state) => state.setName)

    const [inputName, setInputName] = useState(name)
    const [isLoading, setIsLoading] = useState(false)
    const [isWrongWebtoonName, setIsWrongWebtoonName] = useState(false)

    const handleValideName = async () => {
        setIsLoading(true)
        if (await apiService.isValidWebtoonName(inputName)) {
            setName(inputName)
        } else {
            setIsWrongWebtoonName(true)
        }
        setIsLoading(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isWrongWebtoonName) setIsWrongWebtoonName(false)
        setInputName(e.target.value)
    }

    return (
        <section>
            <div className={styles['input-field']}>
                <input
                    type='text'
                    onChange={handleChange}
                    placeholder='Nom du webtoon'
                    disabled={isLoading}
                    value={inputName}
                />
                <button
                    disabled={inputName === name || isLoading}
                    onClick={handleValideName}
                >
                    Valider
                </button>
            </div>
            {isWrongWebtoonName && <p className={styles.error}>Nom de Webtoon invalide</p>}
        </section>
    )
}
