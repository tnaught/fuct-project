require 'compass/import-once/activate'
require 'compass-normalize'
# Require any additional compass plugins here.
#开发环境
environment = :development
#environment = :production
#调试开关
firesass = false
#firesass = true

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "static/home/css"
sass_dir = "static/home/sass"
images_dir = "static/home/image"
javascripts_dir = "static/home/js"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false
#压缩比例
output_style = (environment == :development) ? :nested : :compressed

#调试信息
sass_options = (environment == :development && firesass == true) ? {:debug_info => true} : {}

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
