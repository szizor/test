class Alternative < ActiveRecord::Base
  attr_accessible :name, :description, :population, :status, :budget_expected, :polygon_id, :assigned_budget, :start_date, :end_date, :actor_id, :user_id, :project, :category_id, :group_benefited, :quantity_benefited, :actor_ids, :problem_id, :solution, :end, :porpuse, :components, :fin_name, :fin_tel, :fin_mail, :fin_web, :crono, :budget_expected_pdf, :assigned_budget_pdf, :resume
  belongs_to :user
  belongs_to :actor
  has_many :actors, :through => :actors_alternatives
  has_many :actors_alternatives
  belongs_to :problem
  mount_uploader :budget_expected_pdf, GenericUploader
  mount_uploader :assigned_budget_pdf, GenericUploader
  mount_uploader :crono, GenericUploader
  mount_uploader :resume, GenericUploader

  scope :created_in, ->(year) { where( "YEAR( created_at ) = ?", year ) }
end
