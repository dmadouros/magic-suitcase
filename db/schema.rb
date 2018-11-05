# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_11_02_034413) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "card_colors", force: :cascade do |t|
    t.bigint "card_id"
    t.bigint "color_id"
    t.index ["card_id"], name: "index_card_colors_on_card_id"
    t.index ["color_id"], name: "index_card_colors_on_color_id"
  end

  create_table "card_sets", force: :cascade do |t|
    t.string "name", null: false
    t.string "abbreviation", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "card_types", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "sort_index", null: false
  end

  create_table "cards", force: :cascade do |t|
    t.string "name", null: false
    t.integer "quantity", default: 0, null: false
    t.bigint "card_type_id", null: false
    t.bigint "card_set_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "color_id"
    t.index ["card_set_id"], name: "index_cards_on_card_set_id"
    t.index ["card_type_id"], name: "index_cards_on_card_type_id"
    t.index ["color_id"], name: "index_cards_on_color_id"
  end

  create_table "colors", force: :cascade do |t|
    t.string "name", null: false
    t.string "abbreviation", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "sort_index", null: false
  end

  create_table "decks", force: :cascade do |t|
    t.string "name"
    t.text "contents"
  end

  add_foreign_key "card_colors", "cards"
  add_foreign_key "card_colors", "colors"
  add_foreign_key "cards", "card_sets"
  add_foreign_key "cards", "card_types"
  add_foreign_key "cards", "colors"
end
