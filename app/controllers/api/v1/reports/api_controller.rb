class Api::V1::Reports::ApiController < ActionController::Base
  def get_survey
    @survey
    polygon_id = params[:id]

    if polygon_id == 'todos'
      @survey = Survey.all
    else
      @survey = Survey.where(:polygon_id => polygon_id)
    end

    render(:json => {:survey => @survey})

  end
end