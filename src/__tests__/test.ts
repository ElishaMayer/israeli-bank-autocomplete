import { getAutocompleteSuggestions } from "../index";
test("test with no options", () => {
  expect(getAutocompleteSuggestions("620")[1].branchCode).toStrictEqual("620");
});

test("test with bankCode option", () => {
  expect(
    getAutocompleteSuggestions("620", { bankCode: 12 })[0].branchCode
  ).toStrictEqual("620");
});

test("test with bankCode option", () => {
    expect(
      getAutocompleteSuggestions("620", { bankCode: 12 }).length
    ).toStrictEqual(1);
  });

  test("test with inputType=BRANCH_NAME option", () => {
    expect(
      getAutocompleteSuggestions("620", { inputType: "BRANCH_NAME"}).length
    ).toStrictEqual(0);
  });

  test("test with inputType=BRANCH_CODE option", () => {
    expect(
      getAutocompleteSuggestions("620", { inputType: "BRANCH_CODE"}).length
    ).toStrictEqual(3);
  });

  test("test with inputType=BRANCH_CODE && bankCode option", () => {
    expect(
      getAutocompleteSuggestions("620", { inputType: "BRANCH_CODE",bankCode:12}).length
    ).toStrictEqual(1);
  });
