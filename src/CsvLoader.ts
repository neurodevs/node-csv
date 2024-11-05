import fs from 'fs'
import {
    AbstractFileLoader,
    FileLoader,
    FileLoaderOptions,
} from '@neurodevs/node-file-loader'
import csvParser from 'csv-parser'

export default class CsvLoaderImpl extends AbstractFileLoader<CsvRow[]> {
    public static Class?: CsvLoaderConstructor

    public static Create(options?: FileLoaderOptions) {
        return new (this.Class || this)(options)
    }

    protected fileExtension = '.csv'

    protected async loadFile() {
        return this.loadCsv()
    }

    private async loadCsv() {
        return new Promise((resolve, reject) => {
            const data: CsvRow[] = []
            fs.createReadStream(this.path)
                .pipe(csvParser())
                .on('data', (row) => data.push(row))
                .on('end', () => resolve(data))
                .on('error', (err) => reject(err))
        }) as Promise<CsvRow[]>
    }
}

export type CsvLoader = FileLoader<CsvRow[]>

export type CsvLoaderConstructor = new (
    options?: FileLoaderOptions
) => CsvLoader

export type CsvRow = Record<string, string>
