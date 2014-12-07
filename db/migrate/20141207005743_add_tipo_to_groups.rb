class AddTipoToGroups < ActiveRecord::Migration
  def change
    add_column :groups, :tipo, :string
  end
end
