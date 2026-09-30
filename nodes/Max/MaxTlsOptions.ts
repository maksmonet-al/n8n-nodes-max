import type { IDataObject, IHttpRequestOptions } from 'n8n-workflow';

/**
 * Security hardening: TLS certificate validation is always enabled.
 * Legacy credentials containing ignoreSslIssues=true are intentionally ignored.
 */
export function getMaxTlsOptions(
	_credentials: IDataObject,
): Pick<IHttpRequestOptions, 'skipSslCertificateValidation'> {
	return {};
}
