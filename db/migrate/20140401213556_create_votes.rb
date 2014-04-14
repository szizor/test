class CreateVotes < ActiveRecord::Migration
  def self.up
    create_table :votes do |t|
      t.string :ip_address
      t.integer :problem_id
      t.integer :user_id
      t.timestamps
    end
  end

  def self.down
    drop_table :votes
  end
end
