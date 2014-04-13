class Alternative < ActiveRecord::Base
  attr_accessible :name, :description, :population, :budget_expected, :assigned_budget, :start_date, :end_date, :actor_id, :user_id, :project, :category_id, :group_benefited, :quantity_benefited, :actors_attributes
  belongs_to :user
  belongs_to :actor
  has_and_belongs_to_many :actors
  accepts_nested_attributes_for :actors
end
