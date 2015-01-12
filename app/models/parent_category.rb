class ParentCategory < ActiveRecord::Base
  attr_accessible :name
  has_many :categories

  def total_problems
  	total = 0
  	all_p = Problem.created_in(Time.now.year).count.to_f
  	self.categories.each do |category|
  		sub = 0
  		number = category.problems.count.to_f
  		sub = (number / all_p) * 100 if number > 0
  		total += sub
  	end if all_p > 0
  	total.round
  end

  def total_single_problems(polygon)
    total = 0
    all_p = polygon.problems.created_in(Time.now.year).count.to_f
    self.categories.each do |category|
      sub = 0
      number = category.problems.created_in(Time.now.year).where(:polygon_id => polygon.id).count.to_f
      sub = (number / all_p) * 100 if number > 0
      total += sub
    end
    total.round
  end
end
