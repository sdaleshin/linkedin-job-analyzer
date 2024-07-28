import * as webpack from 'webpack'
import * as path from 'path'
import { getBaseConfig } from './getBaseConfig'
import { getTsRule } from './rules/getTsRule'
import { ModeType } from './types'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as jsonfile from 'jsonfile'

const packageJson = jsonfile.readFileSync('./package.json')

export const getConfig = (
    configDirName: string,
    mode: ModeType,
): webpack.Configuration => {
    const baseConfig = getBaseConfig(mode)
    return {
        ...baseConfig,
        entry: {
            background: './src/background.ts',
            content: './src/content/content.tsx',
            'settings-page': './src/settings-page/settings-page.tsx',
            'test-content-script':
                './src/test-content-script-page/test-content-script.ts',
        },
        output: {
            filename: '[name].js',
            path: path.resolve(configDirName, 'build'),
        },
        module: {
            rules: [getTsRule()],
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'src/images',
                        to: 'images',
                    },
                    {
                        from: 'src/settings-page/index.html',
                        to: 'index.html',
                    },
                    {
                        from: 'src/test-content-script-page/index.html',
                        to: 'test-content-script-page.html',
                    },
                    {
                        from: 'src/fonts',
                        to: 'fonts',
                    },
                    {
                        from: 'src/manifest.json',
                        to: 'manifest.json',
                        transform(content) {
                            const json = JSON.parse(content.toString())
                            json.version = packageJson.version
                            return JSON.stringify(json, null, 2)
                        },
                    },
                ],
            }),
        ],
    }
}
