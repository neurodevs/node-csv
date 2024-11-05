import CsvExtractorImpl from '../../CsvExtractor'
import { CsvRow } from '../../CsvLoader'

export default class SpyCsvExtractor extends CsvExtractorImpl {
    public static shouldThrow = false

    public constructor(csvPath: string, csvData: CsvRow[]) {
        super(csvPath, csvData)
    }
}
