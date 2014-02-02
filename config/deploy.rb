require "bundler/capistrano"

set :application, "imjuve"
set :repository,  "git@github.com:MohamedAlaa/imjuve.git"

set :scm, 'git'

set :deploy_to, '/data/imjuve'

set :keep_releases, 2

set :user, 'deploy'
set :use_sudo, false

# set :symlinks, {
#   "tmp" => "tmp",
#   "log" => "log",
#   "Gemfile.lock" => "Gemfile.lock",
#   "node_modules" => "node_modules",
#   "foreman-env" => ".env"
# }

stage :production do
  set :app_env, 'production'
  set :branch, 'master'
  set :host, '66.228.51.135'
  server "66.228.51.135", :app
end

stage :staging do
  set :app_env, 'staging'
  set :branch, 'staging'
  set :host, '66.228.51.135'
  server "66.228.51.135", :app
end

namespace :unicorn do
  desc "Make the unicorn reload our code"
  task :reload do
    run "/etc/init.d/unicorn_imjuve upgrade"
  end
end

# namespace :airbrake do
#   desc "Manually notify airbrake of the deploy"
#   task :deploy do
#   run "curl --silent -d 'api_key=b035cd29bf7e435c1fb6453f4d6bc39e&deploy[rails_env]=#{app_env}&deploy[local_username]=#{ENV['USER']}&deploy[scm_revision]=#{real_revision}&deploy[scm_repository]=https://github.com/freshout-dev/mideastunes' http://airbrake.io/deploys"
#   end
# end

# namespace :jammit do
#   desc "Generate all the jammit files"
#   task :compile do
#     run "cd /data/mdet/current && bundle exec jammit -c app/assets.yml -u http://#{host}"
#   end
# end

namespace :bundle do
  desc "Install bundle dependencies"
  task :install do
    run "cd /data/imjuve/current && bundle install --without development"
  end
end

after :deploy, "unicorn:reload"
before "deploy:restart", "bundle:install"
# cleanup after every release.
after "deploy:restart", "deploy:cleanup"