import { describe, expect, it } from 'vitest';
import { getShopEligibility, HACKXPANSION_CONSOLE } from './domain';

describe('shop eligibility', () => {
	it('requires four accepted module designs for the console', () => {
		expect(HACKXPANSION_CONSOLE).toMatchObject({
			price: 8,
			requiredModuleDesigns: 4,
			requiredAppDesigns: 0
		});

		expect(getShopEligibility(HACKXPANSION_CONSOLE, { moduleDesigns: 3, appDesigns: 0 })).toEqual({
			eligible: false,
			missingModuleDesigns: 1,
			missingAppDesigns: 0
		});
		expect(getShopEligibility(HACKXPANSION_CONSOLE, { moduleDesigns: 3, appDesigns: 1 })).toEqual({
			eligible: false,
			missingModuleDesigns: 1,
			missingAppDesigns: 0
		});

		expect(getShopEligibility(HACKXPANSION_CONSOLE, { moduleDesigns: 4, appDesigns: 0 })).toEqual({
			eligible: true,
			missingModuleDesigns: 0,
			missingAppDesigns: 0
		});
	});

	it('lets other shop items be ordered without design approvals', () => {
		expect(
			getShopEligibility(
				{ requiredModuleDesigns: 0, requiredAppDesigns: 0 },
				{ moduleDesigns: 0, appDesigns: 0 }
			)
		).toEqual({
			eligible: true,
			missingModuleDesigns: 0,
			missingAppDesigns: 0
		});
	});
});
