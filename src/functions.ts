import { Bank, Branch } from "./types";

const DATA_GOV_BASE_URL = 'https://data.gov.il/api/3/action/datastore_search';

/**
 * Fetch CSV with branches details from Israel Bank
 */
export async function fetchFromDataGov(resourceId: string, limit: number): Promise<any> {
  const axios: any = await import("axios");
  const response = await axios.get(`${DATA_GOV_BASE_URL}?resource_id=${resourceId}&limit=${limit}`);
  return response.data;
}

/**
 * Convert Israel's Bank CSV to JSON data
 * @param csv The CSV
 */
export async function convertBranchesDataFromGovData(
  data: any
): Promise<{ branches: Branch[]; banks: Bank[] }> {

  const total = data.result.total;
  const limit = data.result.limit;

  if(total > limit) {
    console.warn(`The limit ${limit} is too low for the total ${total}`);
  }

  let keysMap = Object.entries({
    "bankCode": "Bank_Code",
    "bankName": "Bank_Name",
    "branchCode": "Branch_Code",
    "branchName": "Branch_Name",
    "branchAddress": "Branch_Address",
    "city": "City",
    "zip": "Zip_Code",
    "phone": "Telephone",
    "fax": "Fax",
    "freePhone": "Free_Tel",
    "accessForDisabled": "Handicap_Access",
    "closedDay": "day_closed",
    "type": "Branch_Type",
    "openDate": "Open_Date",
    "closingDate": "Close_Date",
    "mergeBank": "Merge_Bank",
    "mergeBranch": "Merge_Branch",
    "xCoordinate": "X_Coordinate",
    "yCoordinate": "Y_Coordinate",
  });
  let branches = data.result.records
    .map((record: any) => {
      let branch: any = {};
      keysMap.forEach((entry: string[]) => {
        branch[entry[0]] = record[entry[1]];
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
