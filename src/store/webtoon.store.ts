import { apiService } from '@/service'
import { create } from 'zustand'

interface WebtoonState {
    name: string
    firstChapter: number
    totalChapters: number
    currentChapter: number
    chapterImages: string[]
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
    chapterImages: [],
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
        console.log('firstChapter', firstChapter)
        const chapterImages = await apiService.getChapterImages(name, currentChapter)

        set(() => ({ firstChapter, totalChapters, chapterImages, isLoading: false }))
    },

    setName: async (name: string) => {
        set(() => ({ name }))
        await get().initialize()
    },

    setCurrentChapter: async (currentChapter: number) => {
        const { name } = get()
        set(() => ({ currentChapter }))
        const chapterImages = await apiService.getChapterImages(name, currentChapter)
        set(() => ({ chapterImages }))
    },
}))
