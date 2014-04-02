class Alternative < ActiveRecord::Base
  attr_accessible :name, :description, :population, :budget_expected, :assigned_budget, :start_date, :end_date, :actor_id, :user_id, :project
end
