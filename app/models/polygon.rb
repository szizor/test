class Polygon < ActiveRecord::Base
  attr_accessible :name, :coords, :population, :women_pop, :men_pop, :life_span, :ses, :scholarity, :prod_act, :econ_act, :state_id, :city_id, :neighborhood, :colors, :cero_doce, :quince_diecinueve, :veinticinco_veintinueve, :doce_catorce, :veinte_veinticuatro, :treinta_cincuentainueve, :sesenta, :promedio, :rutas
  validates_presence_of :name, :population, :city_id, :men_pop, :women_pop, :cero_doce, :quince_diecinueve, :veinticinco_veintinueve, :doce_catorce, :veinte_veinticuatro, :treinta_cincuentainueve, :sesenta, :scholarity, :prod_act, :econ_act, :rutas
  belongs_to :state
  has_many :tours
  has_many :events
  has_many :actors
  has_many :groups
  has_many :images
  has_many :videos
  has_many :documents
  has_many :problems
  has_many :trees
  serialize :coords

  scope :created_in, ->(year) { where( "YEAR( created_at ) = ?", year ) }

  def population
    total = women_pop + men_pop
    total
  end

  def women_perc
    (women_pop.to_f * 100 / population).round
  end

  def men_perc
    (men_pop.to_f * 100 / population).round
  end

  def rangos_low
    ((doce_catorce+ quince_diecinueve + veinte_veinticuatro + veinticinco_veintinueve).to_f * 100  / population).round
  end

  def rangos_high
    ((treinta_cincuentainueve + sesenta).to_f * 100  / population).round
  end

  def get_presupuesto
    total = 0
    self.problems.each do |problem|
      problem.alternatives.each do |alt|
        total += alt.budget_expected.to_i
      end
    end
    total
  end

  def total_problems
    total = 0
    self.problems.each do |problem|
      problem.alternatives.each do |alt|
        total += 1
      end
    end
    total
  end

  def ejecucion_problems
    total = 0
    self.problems.each do |problem|
      problem.alternatives.where(:status => "ejecucion").each do |alt|
        total += 1
      end
    end
    total
  end

  def finalizados_problems
    total = 0
    self.problems.each do |problem|
      problem.alternatives.where(:status => "terminado").each do |alt|
        total += 1
      end
    end
    total
  end

   def get_soluciones
    total = 0
    self.problems.each do |problem|
      problem.alternatives.where(:solution => true).each do |alt|
        total += 1
      end
    end
    total
  end

  def get_beneficiados
    total = 0
    self.problems.each do |problem|
      problem.alternatives.each do |alt|
        total += alt.quantity_benefited.to_i
      end
    end
    total
  end

  def get_gestionado
    total = 0
    self.problems.each do |problem|
      problem.alternatives.each do |alt|
        total += alt.assigned_budget.to_i
      end
    end
    total
  end

  def get_actores
    total = 0
    self.problems.each do |problem|
      problem.alternatives.each do |alt|
        total += alt.actors.count
      end
    end
    total
  end

  def alterna
    total = 0
    self.problems.each do |problem|
      problem.alternatives.each do |alt|
        total += 1 if alt.user_id and alt.user_id != 1
      end
    end
    total
  end

  def get_publics
    total = 0
    self.problems.each do |problem|
      total += problem.public ? 1 : 0
    end
    total
  end

  def get_eficacia(year)
    total = 0
    all_problems = 0
    self.problems.each do |problem|
      problem.alternatives.where('extract(year from created_at) = ?', year).each do |alt|
        all_problems += 1
      end
    end
    terminados = 0
    self.problems.each do |problem|
      problem.alternatives.where('extract(year from created_at) = ? and status = ?', year, "terminado").each do |alt|
        terminados += 1
      end
    end
    total = (terminados.to_f / all_problems.to_f) * 100 if terminados > 0 && all_problems > 0
    total
  end

  def get_gestion(year)
    expected = 0
    assigned = 0
    total = 0
    self.problems.each do |problem|
      problem.alternatives.where('extract(year from created_at) = ?', year).each do |alt|
        expected += alt.budget_expected if alt.budget_expected
      end
    end
    self.problems.each do |problem|
      problem.alternatives.where('extract(year from created_at) = ?', year).each do |alt|
        assigned += alt.assigned_budget if alt.assigned_budget
      end
    end
    total = (assigned.to_f / expected.to_f) * 100 if expected > 0 && assigned > 0
    total
  end

  def get_beneficiados(year)
    population = 0
    baneficiarios = 0
    total = 0
    self.problems.each do |problem|
      problem.alternatives.where('extract(year from created_at) = ?', year).each do |alt|
        baneficiarios += alt.quantity_benefited if alt.quantity_benefited
      end
    end
    self.problems.where('extract(year from created_at) = ?', year).each do |problem|
      population += problem.affected_population if problem.affected_population
    end
    total = (baneficiarios.to_f / population.to_f) * 100 if baneficiarios > 0 && population > 0
    total
  end

  def get_distribucion(year)
    expected = 0
    costo = 0
    total = 0
    self.problems.each do |problem|
      problem.alternatives.where('extract(year from created_at) = ?', year).each do |alt|
        expected += alt.budget_expected if alt.budget_expected
      end
    end
    self.problems.where('extract(year from created_at) = ?', year).each do |problem|
      costo += problem.costs if problem.costs
    end
    total = (costo.to_f / expected.to_f) * 100 if expected > 0 && costo > 0
    total
  end

  def get_single_actores(year)
    total = 0
    self.problems.each do |problem|
      problem.alternatives.where('extract(year from created_at) = ?', year).each do |alt|
        total += alt.actors.count
      end
    end
    total
  end

  def get_problems(year)
    total = 0
    all_p = self.problems.count.to_f
    publics = self.problems.where('extract(year from created_at) = ? and public = ?', year, true).count.to_f
    total = (publics / all_p) * 100 if publics > 0 && all_p > 0
    total
  end

  def get_events(year)
    total = 0
    all_p = self.events.count.to_f
    publics = self.events.where('extract(year from created_at) = ?', year).count.to_f
    total = (publics / all_p) * 100 if publics > 0 && all_p > 0
    total
  end

  def get_admin(year)
    total = 0
    all_p = self.problems.where('extract(year from created_at) = ? and public = ?', year, false).count.to_f
    publics = self.problems.where('extract(year from created_at) = ? and public = ?', year, true).count.to_f
    total = (publics / all_p) * 100 if publics > 0 && all_p > 0
    total
  end

  def get_convocados(year)
    total = 0
    expectativa = 0
    asist = 0
    self.events.where('extract(year from created_at) = ?', year).each do |event|
      expectativa += event.participants if event.participants
    end
    self.events.where('extract(year from created_at) = ?', year).each do |event|
      asist += event.total if event.total
    end
    total = (asist.to_f / expectativa.to_f) * 100 if expectativa > 0 && asist > 0
    total
  end

  def get_projects(year)
    total = 0
    all_y  = self.problems.where(:public => true).count.to_f
    this_y = self.problems.where('extract(year from created_at) = ? and public = ?', year, true).count.to_f
    total = (this_y / all_y) * 100 if this_y > 0 && all_y > 0
    total
  end

  def get_planeados(year)
    total = 0
    all_y  = self.problems.where(:public => false).count.to_f
    this_y = self.problems.where('extract(year from created_at) = ? and public = ?', year, false).count.to_f
    total = (this_y / all_y) * 100 if this_y > 0 && all_y > 0
    total
  end

  def get_execution(year)
    total = 0
    self.problems.each do |problem|
      problem.alternatives.where('extract(year from created_at) = ? and status = ?', year, "ejecucion").each do |alt|
        total += 1
      end
    end
    total
  end

  def get_finalized(year)
    total = 0
    self.problems.each do |problem|
      problem.alternatives.where('extract(year from created_at) = ? and status = ?', year, "terminado").each do |alt|
        total += 1
      end
    end
    total
  end

  def get_finalizacion(year)
    total = 0
    finalized = 0
    planned = 0
    self.problems.each do |problem|
      problem.alternatives.where('extract(year from created_at) = ? and status = ?', year, "terminado").each do |alt|
        finalized += 1
      end
    end
    self.problems.each do |problem|
      problem.alternatives.where('extract(year from created_at) = ? and status = ?', year, "terminado").each do |alt|
        planned += 1
      end
    end
    total = (finalized / planned) * 100 if finalized > 0 && planned > 0
    total
  end
end
