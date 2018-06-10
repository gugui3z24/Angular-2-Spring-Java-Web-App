import { UtilityModule } from './utility.module';

describe('UtilityModule', () => {
  let utilityModule: UtilityModule;

  beforeEach(() => {
    utilityModule = new UtilityModule();
  });

  it('should create an instance', () => {
    expect(utilityModule).toBeTruthy();
  });
});
