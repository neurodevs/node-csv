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
import { CsvLoaderImpl } from '@neurodevs/node-csv-loader'

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
import { CsvLoaderImpl } from '@neurodevs/node-csv-loader'

const loader = CsvLoaderImpl.Create({ shouldValidatePath: false })
```

## Testing

You can use the following test doubles for unit testing purposes:

### CsvLoader

- **`FakeCsvLoader`**: Provides a fake implementation to simulate CSV loading for testing.
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
