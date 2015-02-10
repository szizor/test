class AddSocialUrlsToAlternatives < ActiveRecord::Migration
  def change
    add_column :alternatives, :facebook_url, :string
    add_column :alternatives, :twitter, :string
  end
end
