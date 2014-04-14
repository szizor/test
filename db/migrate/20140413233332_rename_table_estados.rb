class RenameTableEstados < ActiveRecord::Migration
  def self.up
    rename_table :estados, :states
  end

 def self.down
    rename_table :states, :estados
 end
end
