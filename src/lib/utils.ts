import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function shuffle<T>(array: T[]) {
	return array
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);
}

/**
 * Calculate the distance between two points on Earth using the Haversine formula
 * @param lat1 Latitude of first point in degrees
 * @param lng1 Longitude of first point in degrees
 * @param lat2 Latitude of second point in degrees
 * @param lng2 Longitude of second point in degrees
 * @returns Distance in miles
 */
export function calculateDistance(
	lat1: number,
	lng1: number,
	lat2: number,
	lng2: number,
): number {
	const R = 3958.8; // Earth's radius in miles
	const dLat = toRadians(lat2 - lat1);
	const dLng = toRadians(lng2 - lng1);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRadians(lat1)) *
			Math.cos(toRadians(lat2)) *
			Math.sin(dLng / 2) *
			Math.sin(dLng / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c;

	return distance;
}

function toRadians(degrees: number): number {
	return degrees * (Math.PI / 180);
}

/**
 * Calculate score based on distance using GeoGuessr-style scoring
 * Max score: 5000 points
 * Score decreases linearly with distance
 * Max distance: ~15,534 miles (25,000 km) - returns 0 points beyond this
 * @param distanceInMiles Distance in miles
 * @returns Score (0-5000)
 */
export function calculateScore(distanceInMiles: number): number {
	const maxDistance = 15534; // ~25,000 km in miles
	const maxScore = 5000;

	if (distanceInMiles >= maxDistance) {
		return 0;
	}

	const score = maxScore * (1 - distanceInMiles / maxDistance);
	return Math.round(score);
}
