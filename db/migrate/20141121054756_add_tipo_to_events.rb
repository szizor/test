class AddTipoToEvents < ActiveRecord::Migration
  def change
    add_column :events, :tipo, :string
  end
end
