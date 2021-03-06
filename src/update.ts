const Parser = require("papaparse");
const nodeFetch = require("node-fetch");
var iconv = require("iconv-lite");

const fs = require("fs");
const DATABASE_URL =
  "https://www.boi.org.il/he/BankingSupervision/BanksAndBranchLocations/Lists/BoiBankBranchesDocs/snifim_he.csv";
nodeFetch(DATABASE_URL)
  .then((res: any) => res.buffer())
  .then((body: any) => {
    let output = iconv.decode(body, "ISO-8859-8");

    let csv = Parser.parse(output);
    let headers = [
      "bankCode",
      "bankName",
      "branchCode",
      "branchName",
      "branchAddress",
      "city",
      "zip",
      "postCode",
      "phone",
      "fax",
      "freePhone",
      "accessForDisabled",
      "closedDay",
      "type",
      "openDate",
      "closingDate",
      "mergeBank",
      "mergeBranch",
      "xCoordinate",
      "yCoordinate",
    ];
    let data = csv.data
      .slice(1)
      .map((row: any) => {
        let obj: any = {};
        row.forEach((element: any, i: number) => {
          obj[headers[i]] = element;
        });
        return obj;
      })
      .filter((branch: any) => branch.bankCode);
    let banks = data
      .reduce((a: any, b: any) => {
        if (a.every((bn: any) => bn.bankCode !== b.bankCode) && b.bankCode) {
          a.push(b);
        }
        return a;
      }, [])
      .map((bank: any) => ({
        bankCode: parseInt(bank.bankCode),
        bankName: bank.bankName,
      }));
    let branchs = data.map((branch: any) => ({
      ...branch,
      bankCode: parseInt(branch.bankCode, 10),
    }));
    banks.push({ bankCode: 9, bankName: "בנק הדואר" });
    branchs.push({
        "bankCode": 9,
        "bankName": "בנק הדואר",
        "branchCode": "1",
        "branchName": "",
        "branchAddress": "",
        "city": "",
        "zip": "",
        "postCode": "",
        "phone": "",
        "fax": "",
        "freePhone": "",
        "accessForDisabled": "",
        "type": "",
        "closedDay": "",
        "openDate": "",
        "closingDate": "",
        "mergeBank": "",
        "mergeBranch": "",
        "xCoordinate": "",
        "yCoordinate": ""
    })
    fs.writeFileSync(
      "src/bank-data.json",
      JSON.stringify({
        branchs,
        banks,
      }),
      {
        encoding: "utf-8",
      }
    );
  });
