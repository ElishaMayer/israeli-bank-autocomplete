import database from "./database";
import { AutocompleteOptions, Branch } from "./types";

/**
 * Get Branch Suggestions
 * @param {string} input the autocomplete input
 * @param {AutocompleteOptions} options autocomplete options
 */
export const getAutocompleteSuggestions = (
  input: string,
  options?: AutocompleteOptions
) => {
  let branches: Branch[] = [];
  if (options && options.bankCode) {
    branches = database.getAllBankBraches(options.bankCode);
  } else {
    branches = database.getAllBrachs();
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
 * Get all branchs
 * @param {number} bankCode bank number ( if the branches need to be from a spesific bank )
 */
export const getAllBranches = (bankCode?: number) => {
  if (bankCode) return database.getAllBankBraches(bankCode);
  else return database.getAllBrachs();
};


/**
 * Get all banks
 */
export const getAllBanks = () => database.getAllBanks();
