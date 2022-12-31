from webassets import Environment, Bundle


def compile_css(assets) -> list:
    mirabilis_style_bundle = Bundle(
        'css/*.css',
        'css/**.css',
        'css/*/**.css',
        'css/**/**.css',
        filters='cssmin',
        output='../dist/css/mirabilis.min.css'
    )

    assets.register('mirabilis_css', mirabilis_style_bundle)

    return [mirabilis_style_bundle]


def compile_js(assets) -> list:
    mirabilis_script_bundle = Bundle(
        'js/*.js',
        'js/**.js',
        'js/*/**.js',
        'js/**/**.js',
        filters='jsmin',
        output='../dist/js/mirabilis.min.js'
    )

    assets.register('mirabilis_scripts', mirabilis_script_bundle)

    return [mirabilis_script_bundle]


def compile_static_assets(assets_path: str) -> None:
    """Configure and build asset bundles."""

    assets_env = Environment(directory=assets_path)

    all_assets = []
    all_assets.extend(compile_css(assets_env))
    all_assets.extend(compile_js(assets_env))

    for asset in all_assets:
        asset.build()
