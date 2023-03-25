import { Bank, Branch } from "./types";

const DATABASE_URL = "https://www.boi.org.il/boi_files/Pikuah/snifim_he.csv";

/**
 * Fetch CSV with branches details from Israel Bank
 */
export async function fetchCSVFromIsraelBank(): Promise<string[][]> {
  const Parser = await import("papaparse");
  const fetch: any = await import("node-fetch");
  //Fetch Israel bank branches CSV file
  const result = await fetch(DATABASE_URL);
  const buffer = await result.buffer();
  const iconv = await import("iconv-lite");
  const output = iconv.decode(buffer, "ISO-8859-8");
  // @ts-ignore
  return Parser.parse(output).data;
}

/**
 * Convert Israel's Bank CSV to JSON data
 * @param csv The CSV
 */
export async function convertBranchesDataFromIsraelBankCSV(
  csv: string[][]
): Promise<{ branches: Branch[]; banks: Bank[] }> {
  //convert the csv rows to js object with the `headers` as field keys
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
  let branches = csv
    .slice(1)
    .map((row: any) => {
      let branch: any = {};
      row.forEach((element: any, i: number) => {
        branch[headers[i]] = element;
      });
      return branch;
    })
    .filter((branch: any) => branch.bankCode);

  //convert bank code to int
  branches = branches.map((branch: any) => ({
    ...branch,
    bankCode: parseInt(branch.bankCode, 10),
  }));

  //Get all the bank codes distinct
  let banks = branches
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

  //Add בנק הדואר separately
  banks.push({ bankCode: 9, bankName: "בנק הדואר" });
  branches.push({
    bankCode: 9,
    bankName: "בנק הדואר",
    branchCode: "1",
    branchName: "",
    branchAddress: "",
    city: "",
    zip: "",
    postCode: "",
    phone: "",
    fax: "",
    freePhone: "",
    accessForDisabled: "",
    type: "",
    closedDay: "",
    openDate: "",
    closingDate: "",
    mergeBank: "",
    mergeBranch: "",
    xCoordinate: "",
    yCoordinate: "",
  });
  return { banks, branches };
}
