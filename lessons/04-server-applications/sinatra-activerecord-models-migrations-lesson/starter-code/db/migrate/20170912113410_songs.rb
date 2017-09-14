class Songs < ActiveRecord::Migration[5.1]
  def change
    create_table :songs do |t|
      t.string :title
      t.string :duration
      t.string :year
      t.string :album
      t.timestamps
    end
  end
end
