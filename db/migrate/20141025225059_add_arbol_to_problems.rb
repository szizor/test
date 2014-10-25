class AddArbolToProblems < ActiveRecord::Migration
  def change
    add_column :problems, :arbol, :string
  end
end
