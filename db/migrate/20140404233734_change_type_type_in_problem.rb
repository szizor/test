class ChangeTypeTypeInProblem < ActiveRecord::Migration
  def change
    change_column :problems, :affects_to, :string
  end
end
