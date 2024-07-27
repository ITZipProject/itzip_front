import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'fastly.picsum.photos'],
  } /*임시 이미지. 추후 이 부분은 삭제*/,
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
