import { useEffect } from 'react'
import { Layout } from './layout/Layout'
import { useWebtoonStore } from './store'

function App() {
    const initialize = useWebtoonStore((state) => state.initialize)
    useEffect(() => {
        initialize()
    }, [initialize])

    return <Layout />
}

export default App
