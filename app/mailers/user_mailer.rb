class UserMailer < ActionMailer::Base
  default :from => "test@imjuve.com"
  
  def registration_confirmation(user)
    @user = user
    mail(:to => "#{user.username} <#{user.email}>", :subject => "Datos de Usuario")
  end
end


