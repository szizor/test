class Alternative < ActiveRecord::Base
  attr_accessible :name, :description, :population, :budget_expected, :assigned_budget, :start_date, :end_date, :actor_id, :user_id, :project, :category_id, :group_benefited, :quantity_benefited, :actor_ids, :problem_id, :solution
  belongs_to :user
  belongs_to :actor
  has_many :actors, :through => :actors_alternatives
  has_many :actors_alternatives
  belongs_to :problem

end
