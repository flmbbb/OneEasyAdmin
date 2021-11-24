//const CompressionPlugin = require('compression-webpack-plugin')
//npm i vue-cli-plugin-compression
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    configureWebpack: {
        devtool: "inline-source-map"
    },
    css: {
        extract: false
    },
    pluginOptions: {
        compression: {
            gzip: {
                filename: '[file].gz[query]',
                algorithm: 'gzip',
                include: /\.(js|css|html|svg|json)(\?.*)?$/i,
                minRatio: 0.8,
            }
        },
        webpackBundleAnalyzer: {
            openAnalyzer: false
        }
    },
    configureWebpack: config => {
        // 开启分离js
        config.optimization = {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 20000,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            // get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                                // npm package names are URL-safe, but some servers don't like @ symbols
                            return `npm.${packageName.replace('@', '')}`
                        }
                    }
                }
            }
        };
        config.externals = {
            'element-plus': 'ElementPlus',
            'vue': 'Vue',
            'vxe-table': 'VXETable'
        }
    },
    // 打包时不生成.map文件
    productionSourceMap: false
}