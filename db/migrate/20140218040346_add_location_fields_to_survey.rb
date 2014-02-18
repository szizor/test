class AddLocationFieldsToSurvey < ActiveRecord::Migration
  def change
    add_column :surveys, :start_time, :datetime
    add_column :surveys, :city, :string
    add_column :surveys, :latitude, :decimal, {:precision=>10, :scale=>6}
    add_column :surveys, :longitude, :decimal, {:precision=>10, :scale=>6}
  end
end
