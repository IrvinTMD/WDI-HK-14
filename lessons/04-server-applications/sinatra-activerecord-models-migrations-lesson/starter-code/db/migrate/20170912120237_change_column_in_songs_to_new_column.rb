class ChangeColumnInSongsToNewColumn < ActiveRecord::Migration[5.1]
  def change
    rename_column :songs, :downloads, :artist_last_name
  end
end
