class Admin::BaseController < ApplicationController
  layout 'admin'
  def authorize_admin
    redirect_to login_url, :alert => "Not authorized" unless current_user.is_admin?
  end
end