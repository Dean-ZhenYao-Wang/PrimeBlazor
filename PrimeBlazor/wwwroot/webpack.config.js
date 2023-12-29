module.exports = {
    entry: './Index.js', // 入口文件路径，根据实际情况进行更改
    output: {
        filename: 'PrimeBlazor.js', // 输出文件名，根据实际情况进行更改
        path: __dirname // 输出目录路径，根据实际情况进行更改
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};