var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
    filename: "[name].css",
    publicPath: '/'
});

module.exports = {
	devtool: 'source-map',
	context: path.join(__dirname, 'src'),
	entry: {
		//bundle: "./bundle",
		//'js/babelPolyfill': 'babel-polyfill',
		'js/bundle': './js/index',
    	//whatwgFetch: "whatwg-fetch",
		//commons: "./commons",
		'stylesheets/style': './stylesheets/style.less'
	},
	output: {
		path: path.join(__dirname, 'public'),
		filename: '[name].js',
		//publicPath: '/public/', //В production можно /public/ для обращения к серверу
		//library: '[name]'
	},

	resolve: {
		modules: [path.resolve(__dirname, "node_modules"), path.resolve(__dirname, "my_modules")],
	},

	resolveLoader: {
         modules: ["web_loaders", "web_modules", "node_loaders", "node_modules"],
    },

	module: {
	  rules: [
	    {
	    	test: /\.jsx?$/,
	    	exclude: [path.resolve(__dirname, "node_modules")],
	    	include: [path.resolve(__dirname, "./src"), path.resolve(__dirname, "my_modules")],
	    	loader: "babel-loader",
            options: {
                presets: [['es2015', {modules: false}], "es2016", "es2017", "react"],
                plugins: ['transform-runtime'],
            }
	    },
	    // {
     //        test: /\.scss$/,
     //        use: extractSass.extract({
     //            use: [
     //            {
     //                loader: "css-loader",
     //                options: {
     //                	autoprefixer: true,
     //        			sourceMap: false,
     //        		},
     //            },
     //            {
     //            	loader: 'postcss-loader',
     //            	options: {
     //            		sourceMap:  false,
     //            		plugins: function () {
     //                        return [
     //                            require("autoprefixer")
     //                        ];
     //                    }
     //            	}
     //            },
     //            {
     //                loader: "sass-loader",


     //                options: {
     //        			includePaths: [path.resolve(__dirname, "./")],
     //        		},
     //            }],
     //            fallback: "style-loader"
     //        }),
	    // },
	    {
            test: /\.less$/,
            use: extractLess.extract({
                use: [
                {
                    loader: "css-loader",
                    options: {
                    	autoprefixer: true,
            			sourceMap: false,
            		},
                },
                {
                	loader: 'postcss-loader',
                	options: {
                		sourceMap:  false,
                		plugins: function () {
                            return [
                                require("autoprefixer")
                            ];
                        }
                	}
                },
                {
                    loader: "less-loader",


                    options: {
            			includePaths: [path.resolve(__dirname, "./")],
            		},
                }],
                fallback: "style-loader"
            }),
	    },
	    {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
            	name: '[path][name].[ext]',
            	//useRelativePath: true
            }  
          }
        ]
      }
	  //   {
	  //   	test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
			// use: "file-loader?name=[name].[ext]",
	  //   }
	  ]
	},
	plugins: [
		//new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: "commons",
		// 	filename: "commons.js",
		// 	minChunks: 2,
		// 	//chunks: ["index"], из каких выносить, можно подключить второй для других
		// }),
		new webpack.LoaderOptionsPlugin({
		    minimize: true,
   		}),
		extractLess,
	],
	watch: true,
}