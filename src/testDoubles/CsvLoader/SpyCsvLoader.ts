import { FileLoaderOptions } from '@neurodevs/node-file-loader'
import CsvLoaderImpl from '../../CsvLoader'

export default class SpyCsvLoader extends CsvLoaderImpl {
    public numCallsToValidatePath = 0
    private originalLoadFile = this.loadFile
    private err = ''

    public constructor(options?: FileLoaderOptions) {
        super(options)
    }

    public setThrowOnLoadFile(err: string) {
        this.err = err

        this.loadFile = async () => {
            throw new Error(this.err)
        }
    }

    public validatePath() {
        this.numCallsToValidatePath++
        super.validatePath()
    }

    public clearTestDouble() {
        this.numCallsToValidatePath = 0
        this.loadFile = this.originalLoadFile
        this.err = ''
    }
}
