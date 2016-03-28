class AddColumnToAlliance < ActiveRecord::Migration
  def change
    add_column :alliances, :description, :string
  end
end
