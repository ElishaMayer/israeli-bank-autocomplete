import { AutocompleteOptions, Bank, Branch } from "./types";
import { convertBranchesDataFromGovData, fetchFromDataGov } from "./functions";

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

    constructor(data: any = {}) {
        this.banks = data.banks || [];
        this.branches = data.branches || [];
    }

    /**
     * Fetch new data from Israel Bank
     */
    async fetchNewDataFromDataGov(resourceId: string, limit: number) {
        const data = await fetchFromDataGov(resourceId, limit);
        const { banks, branches } = await convertBranchesDataFromGovData(data);
        this.banks = banks;
        this.branches = branches;
    }

    /**
    * Export bank data
    */
    exportBankData() {
        if (this.banks.length === 0 || this.branches.length === 0) {
            throw new Error("No data to export. Please call fetchNewDataFromDataGov function first.");
        }

        return {
            banks: this.banks,
            branches: this.branches,
        }
    }


    /**
     * Get all banks
     */
    getAllBanks(): Bank[] {
        return this.banks;
    }

    /**
     * Get bank by bank code
     * @param bankCode bank code
     */
    getBank(bankCode: number) {
        return this.banks.find((bank: Bank) => bank.bankCode === bankCode);
    }

    /**
     * Get all branches
     */
    getAllBranches(): Branch[] {
        return this.branches;
    }

    /**
     * Get all the bank's branches by bank code
     * @param bankCode the bank code
     */
    getAllBankBranches(bankCode: number): Branch[] {
        return this.branches.filter(
            (branch: Branch) => branch.bankCode === bankCode
        );
    }

    /**
     * Get bank branch by bank code
     * @param branchCode branch code
     */
    getBranch(branchCode: string): Branch | undefined {
        return this.branches.find(
            (branch: Branch) => branch.branchCode === branchCode
        );
    }

    /**
    * Get Branch Suggestions
    * @param {string} input the autocomplete input
    * @param {AutocompleteOptions} options autocomplete options
    */
    getAutocompleteSuggestions = (
        input: string,
        options?: AutocompleteOptions
    ) => {
        let branches: Branch[];
        if (options && options.bankCode) {
            branches = this.getAllBankBranches(options.bankCode);
        } else {
            branches = this.getAllBranches();
        }

        if (options && options.inputType === "BRANCH_NAME")
            return branches.filter((branch: Branch) =>
                String(branch.branchName).indexOf(input) !== -1
            );
        else if (options && options.inputType === "BRANCH_CODE")
            return branches.filter((branch: Branch) =>
                String(branch.branchCode).indexOf(input) !== -1
            );
        else if (options && options.inputType === "BOTH")
            return branches.filter(
                (branch: Branch) =>
                    String(branch.branchCode).indexOf(input) !== -1 || String(branch.branchName).indexOf(input) !== -1
            );
        else
            return branches.filter(
                (branch: Branch) =>
                    String(branch.branchCode).indexOf(input) !== -1 || String(branch.branchName).indexOf(input) !== -1
            );
    };

}

export default BankDataSource;
