class ChangeColumnSurveys < ActiveRecord::Migration
  def change
    change_column :surveys, :tipo_droga, :text
    change_column :surveys, :proximo, :text
  end
end
