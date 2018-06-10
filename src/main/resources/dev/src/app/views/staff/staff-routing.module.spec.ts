import { StaffRoutingModule } from './staff-routing.module';

describe('StaffRoutingModule', () => {
  let staffRoutingModule: StaffRoutingModule;

  beforeEach(() => {
    staffRoutingModule = new StaffRoutingModule();
  });

  it('should create an instance', () => {
    expect(staffRoutingModule).toBeTruthy();
  });
});
