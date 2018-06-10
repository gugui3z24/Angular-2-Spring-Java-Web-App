import { StaffModule } from './staff.module';

describe('StaffModule', () => {
  let staffModule: StaffModule;

  beforeEach(() => {
    staffModule = new StaffModule();
  });

  it('should create an instance', () => {
    expect(staffModule).toBeTruthy();
  });
});
