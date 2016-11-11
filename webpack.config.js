module.exports = {
	entry : './src/app.js',
	output : {
		path : './bin',
		publicPath : '/bin/',
		filename: 'app.bundle.js'
	},
	devServer : {inline : true}
}