export type InputType = "BRANCH_CODE" | "BRANCH_NAME" | "BOTH";

export interface AutocompleteOptions {
  bankCode?: number;
  inputType?: InputType;
}

export interface Branch {
  bankCode: number;
  bankName: string;
  branchCode: string;
  branchName: string;
  branchAddress: string;
  city: string;
  zip: string;
  postCode: string;
  phone: string;
  fax: string;
  freePhone: string;
  accessForDisabled: string;
  type: string;
  closedDay: string;
  openDate: string;
  closingDate: string;
  mergeBank: string;
  mergeBranch: string;
  xCoordinate: string;
  yCoordinate: string;
}

export interface Bank {
  bankCode: number;
  bankName: string;
}
