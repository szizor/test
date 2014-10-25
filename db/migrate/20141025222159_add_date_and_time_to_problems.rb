class AddDateAndTimeToProblems < ActiveRecord::Migration
  def change
    add_column :problems, :fecha, :date
    add_column :problems, :hora, :time
  end
end
