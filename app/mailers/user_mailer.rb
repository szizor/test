class UserMailer < ActionMailer::Base
  default :from => "notificaciones@global-objective.com"
  #         :bcc => ["hmorales@global-objective.com", "flor@global-objective.com", "szizor@hotmail.com"]

  def registration_confirmation(user)
    @user = user
    mail(:to => "#{user.username} <#{user.email}>", :subject => "Datos de Usuario", :bcc => ["hmorales@global-objective.com", "flor@global-objective.com"])
  end

  def logged_user(user)
  	@user = user
    mail(:to => "Flor <flor@global-objective.com>", :subject => "Usuario Loggeado")
  end

  def contact_form(message)
    @message = message
    mail(:to => "Info <info@global-objective.com>", :subject => "Mensaje de forma de contacto")
  end

end


