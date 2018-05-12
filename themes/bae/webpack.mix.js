let mix = require('laravel-mix');

mix.js('src/js/app.js', 'static/dist/')
    .sass('src/css/app.scss', 'static/dist/')
    .options({
        postCss: [
            require('css-mqpacker')({ sort: true }),
            require('postcss-flexbugs-fixes')
        ],
        processCssUrls: false
    })
    .disableSuccessNotifications()
    .browserSync({
        proxy: 'localhost:1313',
        injectChanges: true,
        files: ['static/dist/app.scss'],
        notify: false
    });