class CreateDialogues < ActiveRecord::Migration[5.0]
  def change
    create_table :dialogues do |t|
      t.integer :sender_id
      t.integer :receiver_id

      t.timestamps
    end

    add_index :dialogues, :sender_id
    add_index :dialogues, :receiver_id
  end
end
