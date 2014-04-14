class CreateActors < ActiveRecord::Migration
  def self.up
    create_table :actors do |t|
      t.string :name
      t.string :phone
      t.string :website
      t.string :email
      t.string :address
      t.string :facebook
      t.string :twitter
      t.string :contact_name
      t.string :contact_email
      t.string :contact_phone
      t.string :contact_title
      t.integer :actor_type_id
      t.integer :polygon_id
      t.timestamps
    end
  end

  def self.down
    drop_table :actors
  end
end
