import data from "./bank-data.json";
import { Bank, Branch } from "./types";

class Database {
  getAllBanks() {
    let result: Bank[] = data.banks;
    return result;
  }
  getBank(bankCode: number) {
    return data.banks.find((bank: Bank) => bank.bankCode === bankCode);
  }
  getAllBrachs() {
    let result: Branch[] = data.branchs;
    return result;
  }
  getAllBankBraches(bankCode: number) {
    let result: Branch[] = data.branchs.filter(
      (branch: Branch) => branch.bankCode === bankCode
    );
    return result;
  }
  getBranch(branchCode: string) {
    return data.branchs.find(
      (branch: Branch) => branch.branchCode === branchCode
    );
  }
}
const database = new Database();
export default database;
