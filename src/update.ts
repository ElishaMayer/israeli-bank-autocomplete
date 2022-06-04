import fs from "fs";
import {convertBranchesDataFromIsraelBankCSV, fetchCSVFromIsraelBank} from "./functions";

async function main() {
    const csv = await fetchCSVFromIsraelBank();
    const {banks, branches} = await convertBranchesDataFromIsraelBankCSV(csv);
    const bankData = JSON.stringify({
        branches,
        banks,
    }, null, 2);
    //save new db
    fs.writeFileSync(
        "src/bank-data.json",
        bankData,
        {
            encoding: "utf-8",
        }
    );
}


main().catch(console.error);
