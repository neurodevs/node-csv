import fs from 'fs'
import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import { FileLoaderOptions } from '@neurodevs/node-file-loader'
import csvParser from 'csv-parser'
import CsvLoaderImpl, { CsvRow } from '../CsvLoader'
import SpyCsvLoader from '../testDoubles/SpyCsvLoader'

export default class CsvLoaderTest extends AbstractSpruceTest {
    private static actualPath: string
    private static expectedData: CsvRow[]

    private static loader: SpyCsvLoader

    protected static async beforeEach() {
        await super.beforeEach()

        CsvLoaderImpl.Class = SpyCsvLoader

        this.actualPath = 'src/__tests__/testData/test.csv'
        this.expectedData = await this.loadCsv(this.actualPath)

        this.loader = this.Loader()
    }

    @test()
    protected static async canCreateCsvLoader() {
        assert.isTruthy(this.loader)
    }

    @test()
    protected static async loadsCsvDataCorrectly() {
        const data = await this.load(this.actualPath)
        assert.isEqualDeep(data, this.expectedData)
    }

    private static async loadCsv(path: string) {
        return new Promise((resolve, reject) => {
            const data: CsvRow[] = []
            fs.createReadStream(path)
                .pipe(csvParser())
                .on('data', (row) => data.push(row))
                .on('end', () => resolve(data))
                .on('error', (err) => reject(err))
        }) as Promise<CsvRow[]>
    }

    private static async load(path: string) {
        return await this.loader.load(path)
    }

    private static Loader(options?: FileLoaderOptions) {
        return CsvLoaderImpl.Create(options) as SpyCsvLoader
    }
}
