import {TestBed} from "@angular/core/testing";

import {AuthGuardRouterNoSecurityService} from "./auth-guard-router-no-security.service";

describe("AuthGuardRouterNoSecurityService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AuthGuardRouterNoSecurityService = TestBed.get(AuthGuardRouterNoSecurityService);
    expect(service).toBeTruthy();
  });
});
