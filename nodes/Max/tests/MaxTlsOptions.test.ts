import type { IDataObject } from 'n8n-workflow';
import { getMaxTlsOptions } from '../MaxTlsOptions';

describe('MAX TLS hardening', () => {
	it.each([
		{},
		{ ignoreSslIssues: false },
		{ ignoreSslIssues: true },
		{ ignoreSslIssues: 'true' },
	])('never disables certificate validation for legacy credentials %#', (credentials) => {
		const frozen = Object.freeze(credentials) as IDataObject;

		expect(getMaxTlsOptions(frozen)).toEqual({});
	});

	it('never emits skipSslCertificateValidation', () => {
		const options = getMaxTlsOptions({ ignoreSslIssues: true });

		expect(options.skipSslCertificateValidation).toBeUndefined();
	});
});
