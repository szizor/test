class AddUserTypeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :user_type_id, :integer, :default => 4
  end
end
