import { SalesPortalPage } from "../salesPortal.page.js";

export class ProductDeleteModal extends SalesPortalPage {
  readonly uniqueElement = this.page.locator("div[name='confirmation-modal']");

  readonly title = this.uniqueElement.locator("h5");
  readonly closeButton = this.uniqueElement.locator('button.btn-close[aria-label="Close"]');
  readonly yesDeleteButton = this.uniqueElement.locator("button.btn-danger");
  readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");

  readonly confirmationMessage = this.uniqueElement.locator("div.modal-body p");

  async clickClose() {
    await this.closeButton.click();
  }

  async clickDelete() {
    await this.yesDeleteButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }
}
