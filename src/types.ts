export type InputType = "BRANCH_CODE" | "BRANCH_NAME" | "BOTH";

/**
 * Options to pass to autocomplete function
 */
export interface AutocompleteOptions {
    /**
     * Get results only for this bank code
     */
    bankCode?: number;
    /**
     * Search in "BRANCH_CODE" | "BRANCH_NAME" | "BOTH"
     */
    inputType?: InputType;
}

/**
 * A bank branch
 */
export interface Branch {
    /**
     * Bank code
     */
    bankCode: number;
    /**
     * Bank name
     */
    bankName: string;
    /**
     * Branch code
     */
    branchCode: string;
    /**
     * Branch name
     */
    branchName: string;
    /**
     * Branch address
     */
    branchAddress: string;
    /**
     * Branch city
     */
    city: string;
    /**
     * Branch zipcode
     */
    zip: string;
    /**
     * Branch postcode
     */
    postCode: string;
    /**
     * Branch phone number
     */
    phone: string;
    /**
     * Branch fax number
     */
    fax: string;
    /**
     * Branch free phone number
     */
    freePhone: string;
    /**
     * If branch has access for disabled
     */
    accessForDisabled: string;
    /**
     * Branch type
     */
    type: string;
    /**
     * The day of the week that the branch is closed
     */
    closedDay: string;
    /**
     * The date the branch was opened for the first time
     */
    openDate: string;
    /**
     * The date the branch will be closed permanently
     */
    closingDate: string;
    mergeBank: string;
    mergeBranch: string;
    /**
     * Geolocation longitude
     */
    xCoordinate: string;
    /**
     * Geolocation latitude
     */
    yCoordinate: string;
}

/**
 * A bank
 */
export interface Bank {
    /**
     * Bank code
     */
    bankCode: number;
    /**
     * Bank name
     */
    bankName: string;
}
