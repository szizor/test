class AddFieldsToAlternatives < ActiveRecord::Migration
  def change
    add_column :alternatives, :end, :string
    add_column :alternatives, :porpuse, :string
    add_column :alternatives, :components, :string
    add_column :alternatives, :fin_name, :string
    add_column :alternatives, :fin_tel, :string
    add_column :alternatives, :fin_mail, :string
    add_column :alternatives, :fin_web, :string
    add_column :alternatives, :crono, :string
    add_column :alternatives, :budget_expected_pdf, :string
    add_column :alternatives, :assigned_budget_pdf, :string
    add_column :alternatives, :resume, :string
    add_column :alternatives, :polygon_id, :id
  end
end
