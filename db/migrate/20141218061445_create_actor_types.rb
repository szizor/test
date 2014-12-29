#encoding: utf-8
class CreateActorTypes < ActiveRecord::Migration
  def self.up
    create_table :actor_types do |t|
      t.string :name

      t.timestamps
    end
    ActorType.create :name => 'Iniciativa privada'
    ActorType.create :name => 'Gobierno'
    ActorType.create :name => 'Organización de la sociedad civil'
    ActorType.create :name => 'Instituciones de educación'
    ActorType.create :name => 'Iglesias'
    ActorType.create :name => 'Personas'
  end
  def self.down
    drop_table :actor_types
  end
end
