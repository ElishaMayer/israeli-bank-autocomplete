import data from "./bank-data.json";
import {Bank, Branch} from "./types";
import {convertBranchesDataFromIsraelBankCSV, fetchCSVFromIsraelBank} from "./functions";

/**
 * Load the data from `bank-data.json` file
 */
class BankDataSource {
    /**
     * All banks
     */
    banks: Bank[] = [];
    /**
     * All bank branches
     */
    branches: Branch[] = [];

    constructor() {
        this.banks = data.banks;
        this.branches = data.branches;
    }

    /**
     * Fetch new data from Israel Bank
     */
    async fetchNewDataFromIsraelBank() {
        if (typeof window !== "undefined") {
            throw new Error("fetchNewDataFromIsraelBank function is not available in the browser");
        }
        const csv = await fetchCSVFromIsraelBank();
        const {banks, branches} = await convertBranchesDataFromIsraelBankCSV(csv);
        this.banks = banks;
        this.branches = branches;
    }


    /**
     * Get all banks
     */
    getAllBanks(): Bank[] {
        return data.banks;
    }

    /**
     * Get bank by bank code
     * @param bankCode bank code
     */
    getBank(bankCode: number) {
        return data.banks.find((bank: Bank) => bank.bankCode === bankCode);
    }

    /**
     * Get all branches
     */
    getAllBranches(): Branch[] {
        return data.branches;
    }

    /**
     * Get all the bank's branches by bank code
     * @param bankCode the bank code
     */
    getAllBankBranches(bankCode: number): Branch[] {
        return data.branches.filter(
            (branch: Branch) => branch.bankCode === bankCode
        );
    }

    /**
     * Get bank branch by bank code
     * @param branchCode branch code
     */
    getBranch(branchCode: string): Branch | undefined {
        return data.branches.find(
            (branch: Branch) => branch.branchCode === branchCode
        );
    }

    /**
     * @deprecated
     */
    getAllBrachs() {
        return this.getAllBranches()
    }

    /**
     * @deprecated
     */
    getAllBankBraches(bankCode: number) {
        return this.getAllBankBranches(bankCode)
    }
}

const dataSource = new BankDataSource();
export default dataSource;
