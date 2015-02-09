class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :current_user
  before_filter :authenticate #if Rails.env == "production"

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  
  def authorize
    redirect_to root_url, alert: "No estas logeado" unless current_user
  end

  def authorize_admin
    redirect_to root_url, alert: "No estas administrador" unless current_user && current_user.is_admin
  end

  def authenticate
    authenticate_or_request_with_http_basic do |username, password|
      username == "test" && password == "Redespierta2015"
    end
  end

end
