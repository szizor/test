class AddImageToAlternaives < ActiveRecord::Migration
  def change
    add_column :alternatives, :problem_id, :integer
  end
end
