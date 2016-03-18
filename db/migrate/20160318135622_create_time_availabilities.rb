class CreateTimeAvailabilities < ActiveRecord::Migration
  def change
    create_table :time_availabilities do |t|
      t.json :time_availability
      t.references :users, null: false
      t.timestamps null: false
    end
  end
end
