import dataSource from "./dataSource";
import {AutocompleteOptions, Branch} from "./types";

/**
 * Get Branch Suggestions
 * @param {string} input the autocomplete input
 * @param {AutocompleteOptions} options autocomplete options
 */
export const getAutocompleteSuggestions = (
    input: string,
    options?: AutocompleteOptions
) => {
    let branches: Branch[];
    if (options && options.bankCode) {
        branches = dataSource.getAllBankBranches(options.bankCode);
    } else {
        branches = dataSource.getAllBranches();
    }
    if (options && options.inputType === "BRANCH_NAME")
        return branches.filter((branch: Branch) =>
            branch.branchName.includes(input)
        );
    else if (options && options.inputType === "BRANCH_CODE")
        return branches.filter((branch: Branch) =>
            branch.branchCode.includes(input)
        );
    else if (options && options.inputType === "BOTH")
        return branches.filter(
            (branch: Branch) =>
                branch.branchCode.includes(input) || branch.branchName.includes(input)
        );
    else
        return branches.filter(
            (branch: Branch) =>
                branch.branchCode.includes(input) || branch.branchName.includes(input)
        );
};

/**
 * Get all branches
 * @param {number} bankCode bank number ( if the branches need to be from a specific bank )
 */
export const getAllBranches = (bankCode?: number) => {
    if (bankCode) return dataSource.getAllBankBranches(bankCode);
    else return dataSource.getAllBranches();
};


/**
 * Get all banks
 */
export const getAllBanks = () => dataSource.getAllBanks();

/**
 * Update Israel Bank data
 */
export const fetchNewDataFromIsraelBank = () => dataSource.fetchNewDataFromIsraelBank();
