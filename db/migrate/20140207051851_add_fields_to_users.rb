class AddFieldsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :movil, :string
    add_column :users, :municipio, :string
    add_column :users, :estado, :string
  end
end
