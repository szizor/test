class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :current_user

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  
  def authorize
    redirect_to login_url, alert: "No estas logeado" unless current_user
  end

  def authorize_admin
    redirect_to login_url, alert: "No estas administrador" unless current_user && current_user.is_admin
  end

end
