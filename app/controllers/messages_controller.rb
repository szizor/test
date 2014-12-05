class MessagesController < ApplicationController
  def new
   @message = Message.new
  end

  def create_message
    @message = Message.new(params[:message])
    if @message.valid?
      UserMailer.contact_form(@message).deliver
      redirect_to root_url, notice: "Mensaje enviado satisfactoriamente"
    else
      if @message.errors.any?
        field = @message.errors.first[0].to_s
        error = @message.errors.first[1]
        msg = ": "+ field + " " + error
      else
        msg = ", intente de nuevo"
      end
      redirect_to root_url, notice: "Su mensaje no pudo ser enviado#{msg}"
    end
  end
end