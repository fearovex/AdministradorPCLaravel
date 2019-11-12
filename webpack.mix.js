const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
 mix.autoload({
    'jquery': ['$', 'window.jQuery', 'jQuery'],
})

 mix.webpackConfig({
    resolve: {
        alias: {
            'Actions': path.resolve(__dirname, 'resources/js/actions/'),
            'Components': path.resolve(__dirname, 'resources/js/components/'),
            'Assets': path.resolve(__dirname, 'resources/js/assets/'),
            'Util': path.resolve(__dirname, 'resources/js/util/'),
            'Routes': path.resolve(__dirname, 'resources/js/routes/'),
            'Constants': path.resolve(__dirname, 'resources/js/constants/'),
            'Helpers': path.resolve(__dirname, 'resources/js/helpers/'),
            'Api': path.resolve(__dirname, 'resources/js/api/')
        }
    },
    output: {
        chunkFilename: mix.inProduction() ? "js/prod/chunks/[name]?id=[chunkhash].js" : "js/chunks/[name].js"
    }
}); 

mix.js('resources/js/index.js', 'public/js')
   .sass('resources/js/assets/scss/_style.scss', 'public/css/style.css');

mix.options({ extractVueStyles: true });

if (mix.inProduction()) {
  mix.version(["public/css/style.css", "public/js/index.js"]);
} else {
  mix.sourceMaps();
}
