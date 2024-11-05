# node-csv
Load and extract data from CSV files

## Installation

Install the package using npm:

`npm install @neurodevs/node-csv`

Or yarn:

`yarn add @neurodevs/node-csv`

## Usage

### CsvLoader

#### CsvLoader - Code Example

To load a CSV file:

```typescript
import { CsvLoaderImpl } from '@neurodevs/node-csv'

async function loadCsv() {
  const loader = CsvLoaderImpl.Create()
  const data = await loader.load('/path/to/csv')
  console.log(data)
}
```

#### CsvLoader - Disable Path Validation

This class automatically performs the following validations on the path you pass to the load method:

- Asserts that you passed a path
- Asserts that the file exists at the path
- Asserts that the file extension is '.csv'

To turn off path validation (e.g., when you are certain of the file's existence or extension):

```typescript
import { CsvLoaderImpl } from '@neurodevs/node-csv'

const loader = CsvLoaderImpl.Create({ shouldValidatePath: false })
```

### CsvExtractor

To extract data from a CSV file based on a set of rules:

```typescript
import { CsvExtractorImpl } from '@neurodevs/node-csv'

async function extractCsvData() {
    const extractor = await CsvExtractorImpl.Create('/path/to/csv')

    const extractedRecord = extractor.extract([
        {
            column: 'The column you want to search',
            value: 'The value to match in the column',
            extract: 'The column to extract data from'
        },
        {
            column: 'Another column to search',
            value: 'Another value to match',
            extract: 'Another column to extract'
        }
    ])

    return extractedRecord
}
```

## Example Use Case for a Stroboscopic Experiment with EEG

### Example CSV Format

| phase-name      | mean-alpha-band-power | ... |
|-----------------|-----------------------|-----|
| eyes-closed-1   | 12.345                | ... |
| eyes-open-1     | 10.987                | ... |
| ...             | ...                   | ... |
| eyes-closed-5   | ...                   | ... |
| eyes-open-5     | ...                   | ... |

### Example Code

```typescript
import { CsvExtractorImpl, ExtractionRule } from '@neurodevs/node-csv-extractor'

async function extractStroboscopicData() {
    const extractor = await CsvExtractorImpl.Create('/path/to/csv')

    const rules = []
    const numTrials = 5

    for (let i = 1; i <= numTrials; i++) {
        rules.push({
            column: 'phase-name',              // The column to search
            value: `eyes-closed-${i}`,         // The value to match
            extract: 'mean-alpha-band-power'   // The column to extract
        })
        rules.push({
            column: 'phase-name',
            value: `eyes-open-${i}`,
            extract: 'mean-alpha-band-power'
        })
    }

    const extractedRecord = extractor.extract(rules)

    return extractedRecord
}

// Example value of extractedRecord:
//
//  {
//      "eyes-closed-1": 12.345,
//      "eyes-open-1": 10.987,
//      ...
//      "eyes-closed-5": ...,
//      "eyes-open-5": ...
//  }
```

## Testing

You can use the following test doubles for unit testing purposes:

### CsvLoader

- **`FakeCsvLoader`**: Provides a fake implementation to simulate CSV loading during testing.
- **`SpyCsvLoader`**: Wraps the real implementation with enhanced visibility for inspecting internal behavior during testing.

```typescript
import {
  CsvLoaderImpl,
  FakeCsvLoader,
  SpyCsvLoader
} from '@neurodevs/node-csv-loader'

// Use FakeCsvLoader for simulating inputs and outputs in tests
CsvLoaderImpl.Class = FakeCsvLoader

// Use SpyCsvLoader to test real behavior with enhanced internal visibility
CsvLoaderImpl.Class = SpyCsvLoader

const loader = CsvLoaderImpl.Create()
```

### CsvExtractor

- **`FakeCsvExtractor`**: Provides a fake implementation to simulate data extraction during testing.
- **`SpyCsvExtractor`**: Wraps the real implementation with enhanced visibility for inspecting internal behavior during testing.

```typescript
import {
    CsvExtractorImpl,
    FakeCsvExtractor,
    SpyCsvExtractor
} from '@neurodevs/node-csv'

async function createTestDouble() {
    // Use FakeCsvExtractor for simulating the extraction process in tests
    CsvExtractorImpl.Class = FakeCsvExtractor
    
    // Use SpyCsvExtractor to test real behavior with enhanced internal visibility
    CsvExtractorImpl.Class = SpyCsvExtractor
    
    const extractor = await CsvExtractorImpl.Create('/path/to/csv')
}
```
