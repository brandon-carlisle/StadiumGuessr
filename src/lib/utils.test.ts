import { describe, expect, it } from "vitest";
import { calculateDistance, calculateScore } from "./utils";

describe("calculateDistance", () => {
	it("is zero for the same point", () => {
		expect(calculateDistance(51.5, -0.1, 51.5, -0.1)).toBe(0);
	});

	it("measures about 69 miles per degree of latitude", () => {
		expect(calculateDistance(51, 0, 52, 0)).toBeCloseTo(69.1, 0);
	});
});

describe("calculateScore", () => {
	it("scores a direct hit at 5000", () => {
		expect(calculateScore(0)).toBe(5000);
	});

	it("drops off across Britain", () => {
		expect(calculateScore(10)).toBe(4094);
		expect(calculateScore(50)).toBe(1839);
		expect(calculateScore(100)).toBe(677);
		expect(calculateScore(200)).toBe(92);
	});
});
