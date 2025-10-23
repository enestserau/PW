import { test, expect, Page } from "@playwright/test";

async function getTableRow(page: Page, email: string): Promise<Record<string, string> | null> {
  const table = page.locator("#table2");

  const headersLocators = await table.locator("th").all();
  headersLocators.pop();
  const headers = await Promise.all(headersLocators.map((el) => el.innerText()));

  const tableRows = await table.locator("tbody tr").all();
  console.log(tableRows);

  for (const row of tableRows) {
    const cellLocators = row.locator("td").filter({ hasNot: page.locator("a") });
    const cells = await cellLocators.allInnerTexts();

    const emailIndex = headers.indexOf("Email");

    if (cells[emailIndex] === email) {
      const rowData = headers.reduce<Record<string, string>>((result, header, i) => {
        result[header] = cells[i] ?? "";
        return result;
      }, {});
      return rowData;
    }
  }

  return null;
}

test.describe("[Heroku App] Table - getTableRow Function", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");
  });

  test("Get row by email - fbach@yahoo.com", async ({ page }) => {
    const expectedRow = {
      "Last Name": "Bach",
      "First Name": "Frank",
      Email: "fbach@yahoo.com",
      Due: "$51.00",
      "Web Site": "http://www.frank.com",
    };

    const actualRow = await getTableRow(page, "fbach@yahoo.com");

    expect(actualRow).not.toBeNull();
    expect(actualRow).toEqual(expectedRow);
  });

  test("Get row by email - jdoe@hotmail.com", async ({ page }) => {
    const expectedRow = {
      "Last Name": "Doe",
      "First Name": "Jason",
      Email: "jdoe@hotmail.com",
      Due: "$100.00",
      "Web Site": "http://www.jdoe.com",
    };

    const actualRow = await getTableRow(page, "jdoe@hotmail.com");

    expect(actualRow).not.toBeNull();
    expect(actualRow).toEqual(expectedRow);
  });

  test("Get row by email - jsmith@gmail.com", async ({ page }) => {
    const expectedRow = {
      "Last Name": "Smith",
      "First Name": "John",
      Email: "jsmith@gmail.com",
      Due: "$50.00",
      "Web Site": "http://www.jsmith.com",
    };

    const actualRow = await getTableRow(page, "jsmith@gmail.com");

    expect(actualRow).not.toBeNull();
    expect(actualRow).toEqual(expectedRow);
  });

  test("Get row by email - tconway@earthlink.net", async ({ page }) => {
    const expectedRow = {
      "Last Name": "Conway",
      "First Name": "Tim",
      Email: "tconway@earthlink.net",
      Due: "$50.00",
      "Web Site": "http://www.timconway.com",
    };

    const actualRow = await getTableRow(page, "tconway@earthlink.net");

    expect(actualRow).not.toBeNull();
    expect(actualRow).toEqual(expectedRow);
  });

  test("Get row by email - non-existent email", async ({ page }) => {
    const actualRow = await getTableRow(page, "nonexistent@email.com");

    expect(actualRow).toBeNull();
  });
});
