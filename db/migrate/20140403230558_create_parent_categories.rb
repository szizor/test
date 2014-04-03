class CreateParentCategories < ActiveRecord::Migration
  def change
    create_table :parent_categories do |t|
      
      t.string :name
      t.timestamps
    end
  end
end
