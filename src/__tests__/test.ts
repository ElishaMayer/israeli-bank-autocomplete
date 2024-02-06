import BankDataSource from "../index";
import data from './bank-data.json';

const bankDataSource = new BankDataSource(data);

test("test with no options", () => {
    expect(bankDataSource.getAutocompleteSuggestions("1")[1].branchCode).toStrictEqual(1);
});

test("test name search with no options", () => {
    expect(bankDataSource.getAutocompleteSuggestions("פנימי")[0].branchCode).toStrictEqual(2);
});

test("test with bankCode option", () => {
    expect(
        bankDataSource.getAutocompleteSuggestions("1", { bankCode: 18 })[0].branchCode
    ).toStrictEqual(1);
});

test("test search text with bankCode option", () => {
    expect(
        bankDataSource.getAutocompleteSuggestions("תאגידים", { bankCode: 18 })[0].branchCode
    ).toStrictEqual(1);
});

test("test with bankCode option", () => {
    expect(
        bankDataSource.getAutocompleteSuggestions("1", { bankCode: 18 }).length
    ).toStrictEqual(1);
});

test("test with inputType=BRANCH_NAME option", () => {
    expect(
        bankDataSource.getAutocompleteSuggestions("1", { inputType: "BRANCH_NAME" }).length
    ).toStrictEqual(0);
});

test("test with inputType=BRANCH_CODE option", () => {
    expect(
        bankDataSource.getAutocompleteSuggestions("1", { inputType: "BRANCH_CODE" }).length
    ).toStrictEqual(2);
});

test("test with inputType=BRANCH_CODE && bankCode option", () => {
    expect(
        bankDataSource.getAutocompleteSuggestions("1", { inputType: "BRANCH_CODE", bankCode: 22 }).length
    ).toStrictEqual(1);
});

test("test fetch new data from data gov into file", async () => {
    await bankDataSource.fetchNewDataFromDataGovIntoFile('2202bada-4baf-45f5-aa61-8c5bad9646d3', 10);
    const fs = require('fs');
    expect(fs.existsSync('bank-data.json')).toBeTruthy();
});

test("test fetch new data from data gov", async () => {
    await bankDataSource.fetchNewDataFromDataGov('2202bada-4baf-45f5-aa61-8c5bad9646d3', 10);
    expect(bankDataSource.branches.length).toBeGreaterThan(9);
    expect(bankDataSource.banks.length).toBeGreaterThan(3);
});
