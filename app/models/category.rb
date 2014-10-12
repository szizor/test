class Category < ActiveRecord::Base
  attr_accessible :name, :parent_category_id
  belongs_to :parent_category
  def name_with_count
  	"#{self.name} (#{counts})"
  end

  def counts
  	Problem.where(:category_id => self.id).length
  end

end
