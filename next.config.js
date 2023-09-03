/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push({
            test: /\.(vert|frag)$/, // This regex matches both .vs and .fs files
            use: "raw-loader",
        });

        return config;
    },
};

module.exports = nextConfig;
