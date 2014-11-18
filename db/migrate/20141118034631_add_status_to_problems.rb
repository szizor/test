class AddStatusToProblems < ActiveRecord::Migration
  def change
    add_column :problems, :status, :string
  end
end
