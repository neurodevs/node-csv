import { CsvLoader, CsvRow } from '../../CsvLoader'

export default class FakeCsvLoader implements CsvLoader {
    private static fakeData: CsvRow[] = []

    public loadCalledWith: string[] = []

    public static setFakeData(data: CsvRow[]) {
        this.fakeData = data
    }

    public async load(path: string) {
        this.loadCalledWith.push(path)
        return FakeCsvLoader.fakeData
    }
}
