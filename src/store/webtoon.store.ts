import { apiService } from '@/service'
import { create } from 'zustand'

interface WebtoonState {
    name: string
    firstChapter: number
    totalChapters: number
    currentChapter: number
    totalImages: number
    isLoading: boolean
    error: string | null
}

interface WebtoonAction {
    initialize: () => Promise<void>
    setName: (name: string) => Promise<void>
    setCurrentChapter: (currentChapter: number) => Promise<void>
}

interface WebtoonStore extends WebtoonState, WebtoonAction {}

const initialState: WebtoonState = {
    name: 'solo-leveling',
    firstChapter: 0,
    totalChapters: 1,
    currentChapter: 1,
    totalImages: 0,
    isLoading: false,
    error: null,
}

export const useWebtoonStore = create<WebtoonStore>()((set, get) => ({
    ...initialState,
    initialize: async () => {
        set(() => ({ isLoading: true }))
        const { name, currentChapter } = get()
        if (!name) {
            console.error('Webtoon name is not set.')
            return
        }
        const { firstChapter, totalChapters } = await apiService.getChapterInfo(name)
        const totalImages = await apiService.getImageCount(name, currentChapter)

        set(() => ({ firstChapter, totalChapters, totalImages, isLoading: false }))
    },

    setName: async (name: string) => {
        set(() => ({ name }))
        await get().initialize()
    },

    setCurrentChapter: async (currentChapter: number) => {
        const { name } = get()
        set(() => ({ currentChapter }))
        const totalImages = await apiService.getImageCount(name, currentChapter)
        set(() => ({ totalImages }))
    }
}))
