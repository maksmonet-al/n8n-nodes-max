import { URL, domainToASCII } from 'node:url';

export const MAX_API_BASE_URL = 'https://platform-api2.max.ru';

/**
 * Security hardening: MAX API traffic is permanently pinned to the official
 * endpoint. Any legacy/custom value stored in n8n credentials is ignored.
 */
export function normalizeMaxBaseUrl(_value: unknown): string {
	return MAX_API_BASE_URL;
}

/** Converts an IDN webhook hostname to its ASCII/Punycode form for MAX TLS validation. */
export function normalizeMaxWebhookUrl(value: unknown): string {
	const rawValue = typeof value === 'string' ? value.trim() : String(value ?? '').trim();
	if (rawValue.length === 0) {
		return rawValue;
	}

	try {
		const parsed = new URL(rawValue);
		parsed.hostname = domainToASCII(parsed.hostname);
		return parsed.toString();
	} catch {
		return rawValue;
	}
}
