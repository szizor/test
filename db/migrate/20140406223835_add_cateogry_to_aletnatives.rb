class AddCateogryToAletnatives < ActiveRecord::Migration
  def change
    add_column :alternatives, :category_id, :integer
    add_column :alternatives, :group_benefited, :string
    add_column :alternatives, :quantity_benefited, :integer
    add_column :alternatives, :solution, :boolean, :default => false
  end
end
