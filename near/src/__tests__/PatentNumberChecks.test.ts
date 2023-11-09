
import { isFormatOne, isFormatTwo, isPctNumber } from '@/utils/PatentNumberChecks';
import { isInternationalRegistrationNumber } from './registrationNumberUtils';

describe('International Registration Number Tests', () => {
    it('should return true for valid international registration number', () => {
        const registrationNumber = '123456';
        expect(isInternationalRegistrationNumber(registrationNumber)).toBe(true);
    });

    it('should return false for international registration number with non-digit characters', () => {
        const registrationNumber = 'AB1234';
        expect(isInternationalRegistrationNumber(registrationNumber)).toBe(false);
    });

    it('should return false for international registration number with invalid length', () => {
        const registrationNumber = '123';
        expect(isInternationalRegistrationNumber(registrationNumber)).toBe(false);
    });
});

describe('PCT Number Format Tests', () => {
    describe('isFormatOne', () => {
        it('should return true for valid format one PCT number', () => {
            const pctNumber = 'US2011123456';
            expect(isFormatOne(pctNumber)).toBe(true);
        });

        it('should return true for valid format one PCT number with slash', () => {
            const pctNumber = 'US2011/123456';
            expect(isFormatOne(pctNumber)).toBe(true);
        });

        it('should return false for invalid format one PCT number', () => {
            const pctNumber = 'US123456789';
            expect(isFormatOne(pctNumber)).toBe(false);
        });
    });

    describe('isFormatTwo', () => {
        it('should return true for valid format two PCT number', () => {
            const pctNumber = 'US1112345';
            expect(isFormatTwo(pctNumber)).toBe(true);
        });

        it('should return true for valid format two PCT number with slash', () => {
            const pctNumber = 'US11/12345';
            expect(isFormatTwo(pctNumber)).toBe(true);
        });

        it('should return false for invalid format two PCT number', () => {
            const pctNumber = 'US123456789';
            expect(isFormatTwo(pctNumber)).toBe(false);
        });
    });

    describe('isPctNumber', () => {
        it('should return true for valid format one PCT number', () => {
            const pctNumber = 'US2011123456';
            expect(isPctNumber(pctNumber)).toBe(true);
        });

        it('should return true for valid format two PCT number', () => {
            const pctNumber = 'US1112345';
            expect(isPctNumber(pctNumber)).toBe(true);
        });

        it('should return false for invalid PCT number', () => {
            const pctNumber = 'US123456789';
            expect(isPctNumber(pctNumber)).toBe(false);
        });

        it('should return false for PCT number with invalid length', () => {
            const pctNumber = 'US123';
            expect(isPctNumber(pctNumber)).toBe(false);
        });
    });
});