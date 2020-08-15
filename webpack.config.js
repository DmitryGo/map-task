const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const jsLoaders = () => {
	return [
		{
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env', '@babel/preset-react']
			}
		},
		'eslint-loader',
	];
};

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: './index.js',
	output: {
		filename: 'bundle.[hash].js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.js'],
		alias: {
			'app': path.resolve(__dirname, 'src'),
		}
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			template: 'index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'bundle.[hash].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				]
			},
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				use: jsLoaders(),
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 3001,
		watchContentBase: true,
		progress: true
	},
}
