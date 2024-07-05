import { SCREEN_STORAGE } from '@/fixtures/screenStorage'

export const store = jest.fn()

export const load = (key: string) =>  {

    const testStore: any = { ...SCREEN_STORAGE }

    const stored = testStore[key]
    return stored == null ? undefined : JSON.parse(stored);
}