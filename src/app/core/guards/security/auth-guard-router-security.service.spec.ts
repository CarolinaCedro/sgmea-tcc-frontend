import {TestBed} from "@angular/core/testing";

import {AuthGuardRouterSecurityService} from "./auth-guard-router-security.service";

describe("AuthGuardRouterSecurityService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AuthGuardRouterSecurityService = TestBed.get(AuthGuardRouterSecurityService);
    expect(service).toBeTruthy();
  });
});
