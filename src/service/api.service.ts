export class APIService {
    readonly #MAX_CHAPTERS = 10000
    readonly #MAX_IMAGES = 999
    readonly #BASE_URL = 'https://c1.clancd.com'

    async getChapterInfo(
        webtoonName: string,
    ): Promise<{ firstChapter: number; totalChapters: number }> {
        try {
            const chapter0Exists = await this.#checkExistingUrlByImageLoading(this.getImageUrl(webtoonName, 0, 1))
            const firstChapter = chapter0Exists ? 0 : 1

            let currentChapter = firstChapter

            while (currentChapter < this.#MAX_CHAPTERS) {
                try {
                    const exists = await this.#checkExistingUrlByImageLoading(
                        this.getImageUrl(webtoonName, currentChapter, 1),
                    )
                    if (!exists) {
                        break
                    }
                    currentChapter++
                } catch (error) {
                    console.error(`Error checking chapter ${currentChapter}:`, error)
                    break
                }
            }

            const lastChapter = currentChapter - 1
            const totalChapters = lastChapter - firstChapter + 1

            return {
                firstChapter,
                totalChapters: Math.max(0, totalChapters),
            }
        } catch (error) {
            console.error('Error in getChapterInfo:', error)
            throw new Error(`Unable to determine chapter information for ${webtoonName}`)
        }
    }

    getImageCount = async (webtoonName: string, chapterNumber: number): Promise<number> => {
        try {
            let imageNumber = 1

            while (imageNumber < this.#MAX_IMAGES) {
                try {
                    const exists = await this.#checkExistingUrlByImageLoading(
                        this.getImageUrl(webtoonName, chapterNumber, imageNumber),
                    )
                    if (!exists) {
                        break
                    }
                    imageNumber++
                } catch (error) {
                    console.error(
                        `Error checking image ${imageNumber} in chapter ${chapterNumber}:`,
                        error,
                    )
                    break
                }
            }

            return Math.max(0, imageNumber - 1)
        } catch (error) {
            console.error(`Error in getImageCount for chapter ${chapterNumber}:`, error)
            throw new Error(
                `Unable to determine image count for ${webtoonName} chapter ${chapterNumber}`,
            )
        }
    }

    getImageUrl = (webtoonName: string, chapterNumber: number, imageNumber: number): string =>
        `${this.#BASE_URL}/${webtoonName}/chapter-${chapterNumber}/${this.#formatImageNumber(
            imageNumber,
        )}.jpg`

    // #checkExistingUrl = async (url: string): Promise<boolean> => {
    //     try {
    //         const response = await fetch(url, {
    //             method: 'HEAD',
    //             signal: AbortSignal.timeout(5000),
    //         })
    //         return response.ok
    //     } catch (error) {
    //         console.error('Error checking URL:', error)
    //         return false
    //     }
    // }

    #checkExistingUrlByImageLoading = (url: string): Promise<boolean> => {
        return new Promise((resolve) => {
            const img = new Image()

            img.onload = () => resolve(true)

            img.onerror = () => resolve(false)

            const timeout = setTimeout(() => {
                console.error(`Timeout checking image: ${url}`)
                resolve(false)
            }, 5000)

            img.onload = () => {
                clearTimeout(timeout)
                resolve(true)
            }

            img.onerror = () => {
                clearTimeout(timeout)
                resolve(false)
            }

            img.src = url
        })
    }

    #formatImageNumber = (number: number): string => {
        return number.toString().padStart(3, '0')
    }
}

export const apiService = new APIService()
