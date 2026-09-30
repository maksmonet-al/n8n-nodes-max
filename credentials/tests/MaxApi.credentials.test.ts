import { MaxApi } from '../MaxApi.credentials';

describe('MaxApi hardened credentials', () => {
	let credentials: MaxApi;

	beforeEach(() => {
		credentials = new MaxApi();
	});

	it('exposes only the access token as a configurable credential', () => {
		expect(credentials.properties.map((property) => property.name)).toEqual(['accessToken']);

		const accessToken = credentials.properties[0];
		expect(accessToken).toMatchObject({
			displayName: 'Access Token',
			type: 'string',
			default: '',
		});
		expect(accessToken?.typeOptions?.password).toBe(true);
	});

	it('does not expose custom API URL or TLS bypass controls', () => {
		const propertyNames = credentials.properties.map((property) => property.name);

		expect(propertyNames).not.toContain('baseUrl');
		expect(propertyNames).not.toContain('ignoreSslIssues');
	});

	it('pins credential validation to the official MAX API', () => {
		expect(credentials.test.request).toMatchObject({
			baseURL: 'https://platform-api2.max.ru',
			url: '/me',
			headers: {
				Authorization: '={{$credentials.accessToken}}',
			},
		});
		expect(credentials.test.request.skipSslCertificateValidation).toBeUndefined();
	});

	it('keeps the expected n8n credential metadata', () => {
		expect(credentials.name).toBe('maxApi');
		expect(credentials.displayName).toBe('Max API');
		expect(credentials.documentationUrl).toBe('https://dev.max.ru/docs-api');
		expect(credentials.icon).toBe('file:max.svg');
	});
});
