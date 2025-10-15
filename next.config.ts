import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    images: {
        domains:['pub-5d27047fc1484a18b45c258671461760.r2.dev']
    }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);