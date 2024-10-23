import 'jest-preset-angular/setup-jest';
import {TestBed} from "@angular/core/testing";
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";
// Se não for necessário, não precisa chamar o initTestEnvironment aqui
beforeAll(() => {
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
});
