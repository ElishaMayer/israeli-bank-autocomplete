import BankDataSource from "./BankDataSource";
import bankData from './bank-data.json';

const bankDataSource = new BankDataSource(bankData);

/**
 * @deprecated
 */
export const getAutocompleteSuggestions = bankDataSource.getAutocompleteSuggestions.bind(bankDataSource);

/**
 * @deprecated
 */
export const getAllBranches = bankDataSource.getAllBranches.bind(bankDataSource);

/**
 * @deprecated
 */
export const getAllBanks = bankDataSource.getAllBanks.bind(bankDataSource);

export default BankDataSource;
