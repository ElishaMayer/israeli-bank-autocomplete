# Israeli Bank Autocomplete

Autocomplete for banks in Israel

## Installation

```
npm i israeli-bank-autocomplete
```

## About

This package will help with fetching the data from [data.gov.il](https://data.gov.il/) and searching in the data. The package doesn't contain the data itself. Before calling `fetchNewDataFromDataGovIntoFile` or `fetchNewDataFromDataGov` make sure to read the [terms of use of data.gov.il](https://info.data.gov.il/datagov/rools).

This package uses the following data source [2202bada-4baf-45f5-aa61-8c5bad9646d3](https://data.gov.il/dataset/branches/resource/2202bada-4baf-45f5-aa61-8c5bad9646d3). Please review this page too.

## Importing

```javascript
const BankDataSource = require("israeli-bank-autocomplete");
```

## Initialization

First get the `bank-data.json` file by running 

```javascript
const bankDataSource = new BankDataSource();
await bankDataSource.fetchNewDataFromDataGovIntoFile('<resourceId>', 1600);
```

This will generate the `bank-data.json`. Make sure to save it, and load the data from it.

```javascript
import data from './bank-data.json';
const bankDataSource = new BankDataSource(data);
```

or 

```javascript
const bankDataSource = new BankDataSource();
await bankDataSource.fetchNewDataFromDataGov('<resourceId>', 1600);
```

When calling `fetchNewDataFromDataGov`, make sure that you know the limits of calling data.gov.il.

Both function `fetchNewDataFromDataGovIntoFile` and `fetchNewDataFromDataGov` need to get the `resourceId` and a `limit`. The supported resourceId is [`2202bada-4baf-45f5-aa61-8c5bad9646d3`](https://data.gov.il/dataset/branches/resource/2202bada-4baf-45f5-aa61-8c5bad9646d3), and currently a limit of 1600 will return all the results. If you pick a too low limit, you will get a warning.

## Get autocomplete suggestions

To get bank branches based on a name or a branch code

```javascript
let suggestions = bankDataSource.getAutocompleteSuggestions("חדר", { bankCode: 12 });
/*
suggestions = [
  {
    bankCode: 12,
    bankName: 'בנק הפועלים בע"מ',
    branchCode: '620',
    branchName: 'חדרה',
    branchAddress: 'הרברט סמואל 85 ',
    city: 'חדרה',
    zip: '',
    postCode: '',
    phone: '04-6329583',
    fax: '',
    freePhone: '',
    accessForDisabled: 'כן',
    closedDay: 'יום ו',
    type: 'רגיל',
    openDate: '01/01/1949',
    closingDate: '',
    mergeBank: '',
    mergeBranch: '',
    xCoordinate: '34.921286',
    yCoordinate: '32.436023'
  }
]
*/
```

The function `getAutocompleteSuggestions` takes two parameters

| Argument Name | Description     | Format              |
| ------------- | --------------- | ------------------- |
| input         | the users input | String              |
| options       | options         | AutocompleteOptions |

## AutocompleteOptions

| Argument Name | Description                                             | Format                           |
| ------------- | ------------------------------------------------------- | -------------------------------- |
| bankCode      | get suggestions only for the given bank                 | Number                           |
| inputType     | get the suggestions only based on branch name/code/both | BRANCH_CODE / BRANCH_NAME / BOTH |

## Get All Banks

To get all banks use the following function

```javascript
let banks = bankDataSource.getAllBanks();
/*
banks = [
  { bankCode: 4, bankName: 'בנק יהב לעובדי המדינה בע"מ' },
  { bankCode: 10, bankName: 'בנק לאומי לישראל בע"מ' },
  { bankCode: 11, bankName: 'בנק דיסקונט לישראל בע"מ' },
  { bankCode: 12, bankName: 'בנק הפועלים בע"מ' },
  { bankCode: 13, bankName: '13001-בנק אגוד לישראל בע"מ' },
  { bankCode: 14, bankName: 'בנק אוצר החייל בע"מ' },
  { bankCode: 17, bankName: 'בנק מרכנתיל דיסקונט בע"מ' },
  { bankCode: 18, bankName: "הבנק הדיגיטלי הראשון בע\"מ" },
  { bankCode: 20, bankName: 'בנק מזרחי טפחות בע"מ' },
  { bankCode: 22, bankName: 'Citibank N.A' },
  { bankCode: 23, bankName: "אייצ' אס בי סי בנק" },
  { bankCode: 26, bankName: 'יובנק בע"מ' },
  { bankCode: 31, bankName: 'בנק הבינלאומי הראשון לישראל בע"מ' },
  { bankCode: 39, bankName: 'SBI State Bank of India' },
  { bankCode: 46, bankName: 'בנק מסד בע"מ' },
  { bankCode: 50, bankName: 'מרכז סליקה בנקאי בע"מ' },
  { bankCode: 52, bankName: 'בנק פועלי אגודת ישראל בע"מ' },
  { bankCode: 54, bankName: 'בנק ירושלים בע"מ' },
  { bankCode: 59, bankName: 'שירותי בנק אוטומטיים' },
  { bankCode: 68, bankName: 'מוניציפל בנק בע"מ' },
  { bankCode: 99, bankName: 'בנק ישראל' },
  { bankCode: 9, bankName: 'בנק הדואר' }
]
*/
```

## Get all branches

To all the branches use `getAllBranches`
