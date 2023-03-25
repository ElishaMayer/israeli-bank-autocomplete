# Israeli Bank Autocomplete

Autocomplete for banks in Israel

## Installation

```
npm i israeli-bank-autocomplete
```

## Importing

```javascript
const {
  getAutocompleteSuggestions,
  getAllBanks,
  getAllBranches,
} = require("israeli-bank-autocomplete");
```

## Get autocomplete suggestions

To get bank branches based on a name or a branch code

```javascript
let suggestions = getAutocompleteSuggestions("חדר", { bankCode: 12 });
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
let banks = getAllBanks();
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

## Update Data From Israel Bank

This function will fetch the data directly from Israel Bank. Run this if you want to make sure your data is up-to-date.

```javascript
await fetchNewDataFromIsraelBank();
```

> This function would only be called from NodeJS environments. You can't run this from your browser.

> Running this will fetch data from [https://www.boi.org.il](https://www.boi.org.il). Make sure to read
> their [terms](https://www.boi.org.il/%D7%AA%D7%A0%D7%90%D7%99-%D7%A9%D7%99%D7%9E%D7%95%D7%A9-%D7%91%D7%90%D7%AA%D7%A8/). This package is not responsible for any action done by
> calling this function.
