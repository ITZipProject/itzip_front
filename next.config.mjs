import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

export default withSentryConfig(nextConfig, {
    org: 'darkoverlord',
    project: 'darkoverload-front',
    silent: !process.env.CI,
    widenClientFileUpload: true,
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
    // Sentry 인증 토큰
    authToken: process.env.SENTRY_AUTH_TOKEN,
});
