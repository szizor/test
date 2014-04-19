::APP_CONFIG = YAML.load_file("#{Rails.root}/config/config.yml")[Rails.env].symbolize_keys!
ActionMailer::Base.default_url_options[:host] = "66.228.51.135"