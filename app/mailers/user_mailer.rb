class UserMailer < ActionMailer::Base
  default :from => "notificaciones@global-objective.com",
          :bcc => ["hmorales@global-objective.com", "flor@global-objective.com", "szizor@hotmail.com"]
  
  def registration_confirmation(user)
    @user = user
    mail(:to => "#{user.username} <#{user.email}>", :subject => "Datos de Usuario")
  end
end


