import {TestBed} from "@angular/core/testing";

import {GrantRolesGuardService} from "./grant-roles-guard.service";

describe("GrantRolesGuardService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: GrantRolesGuardService = TestBed.get(GrantRolesGuardService);
    expect(service).toBeTruthy();
  });
});
