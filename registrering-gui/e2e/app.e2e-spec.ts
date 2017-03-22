import {RegistreringGuiPage} from "./app.po";
import {browser, element, by, protractor} from "protractor";
import {} from 'jasmine';
declare function setTimeout(callback: Function, milliseconds: number): any
describe('registrering-gui App', () => {
  let page: RegistreringGuiPage;

  beforeEach(() => {
    page = new RegistreringGuiPage();
      browser.get("/")
    let usernameInput = element(by.css("input[name=username]"));
    usernameInput.sendKeys("dask");
    let passwordInput = element(by.css("input[name=password]"));
    passwordInput.sendKeys("123");
    let submitButton = element(by.css("form[name=loginForm] button"));
    submitButton.click();
    var isLoggedInElement = element(by.css('.login-status'));
    var EC = protractor.ExpectedConditions;
    browser.wait(EC.presenceOf(isLoggedInElement), 10000);
  });
  beforeAll(()=> {
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Datakataloger');
  });

  it("Should be able to login", () => {
    let usernameInput = element(by.css("input[name=username]"));
    usernameInput.sendKeys("dask");
    let passwordInput = element(by.css("input[name=password]"));
    passwordInput.sendKeys("123");
    let submitButton = element(by.css("form[name=loginForm] button"));
    submitButton.click();

    expect(page.getLoginStatusText()).toEqual('Pålogget som dask');
  });

  it("Should save datacatalog fields upon typing", () => {
    let catalogLink = element(by.css("#datacatalogs td"));
    catalogLink.click();

    let datasetH1Input = element(by.css(".fdk-register-h1"));
    datasetH1Input.clear();
    datasetH1Input.sendKeys('New datacatalog name');

    var EC = protractor.ExpectedConditions;
    var alertSuccess = element(by.css('.alert-success'));
    browser.wait(EC.presenceOf(alertSuccess), 10000);

    browser.refresh();
    datasetH1Input = element(by.css(".fdk-register-h1"));
    browser.wait(EC.textToBePresentInElementValue(datasetH1Input, 'New datacatalog name'),1000).then(() => {
      expect(page.getH1Value()).toEqual('New datacatalog name');
    });
  });

  it("Should save dataset fields upon typing", () => {
    let catalogLink = element(by.css("#datacatalogs td"));
    catalogLink.click();

    let datasetLink = element(by.css("#datasets td"));
    datasetLink.click();

    let datasetH1Input = element(by.css(".fdk-register-h1"));
    datasetH1Input.clear();
    datasetH1Input.sendKeys('New dataset name');

    var EC = protractor.ExpectedConditions;
    var alertSuccess = element(by.css('.alert-success'));
    browser.wait(EC.presenceOf(alertSuccess), 10000);

    browser.refresh();
    datasetH1Input = element(by.css(".fdk-register-h1"));
    browser.wait(EC.textToBePresentInElementValue(datasetH1Input, 'New dataset name'),1000).then(() => {
      expect(page.getH1Value()).toEqual('New dataset name');
    });
  });
});
