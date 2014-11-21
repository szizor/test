class AddStatusToAlternative < ActiveRecord::Migration
  def change
  	add_column :alternatives, :status, :string
  end
end
