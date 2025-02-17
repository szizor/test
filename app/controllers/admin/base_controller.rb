class Admin::BaseController < ApplicationController
  before_filter :authorize_admin	
  layout 'admin'

  def authorize_admin
    redirect_to root_url, :alert => "No authorizado" unless current_user && current_user.is_admin?
  end
  
end