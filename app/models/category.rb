class Category < ActiveRecord::Base
  attr_accessible :name, :parent_category_id
  belongs_to :parent_category
  has_many :problems

  def name_with_count
  	"#{self.name} (#{counts})"
  end

  def counts
  	Problem.where(:category_id => self.id).length
  end

  def total_problems
  	total = 0
  	all_p = Problem.created_in(Time.now.year).count.to_f
    sub = 0
		number = self.problems.count.to_f
		sub = (number / all_p) * 100 if number > 0
		total += sub
  	total.round
  end

  def total_single_problems(polygon)
    total = 0
    sub = 0
    number = self.problems.created_in(Time.now.year).where(:polygon_id => polygon.id).count.to_f
    all_p = polygon.problems.created_in(Time.now.year).count.to_f
    total = (number / all_p) * 100 if number > 0
    total.round
  end

end
