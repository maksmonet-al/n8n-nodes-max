import type { Icon, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

const OFFICIAL_MAX_API_BASE_URL = 'https://platform-api2.max.ru';

/**
 * Hardened MAX credentials.
 *
 * Only the access token is configurable. The API endpoint is fixed to the
 * official MAX Bot API and TLS certificate validation cannot be disabled.
 */
export class MaxApi implements ICredentialType {
	name = 'maxApi';
	displayName = 'Max API';
	icon: Icon = 'file:max.svg';
	documentationUrl = 'https://dev.max.ru/docs-api';

	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'The bot access token. Get it from @PrimeBot in Max messenger.',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: OFFICIAL_MAX_API_BASE_URL,
			url: '/me',
			headers: {
				Authorization: '={{$credentials.accessToken}}',
			},
		},
	};
}
