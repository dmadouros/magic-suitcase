# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

CardSet.create!(name: 'Guilds of Ravnica', abbreviation: 'GRN')
CardSet.create!(name: 'Dominaria', abbreviation: 'DOM')
set_rix = CardSet.create!(name: 'Rivals of Ixalan', abbreviation: 'RIX')
set_xln = CardSet.create!(name: 'Ixalan', abbreviation: 'XLN')
set_m19 = CardSet.create!(name: 'Core Set 2019', abbreviation: 'M19')

type_instant = CardType.create!(name: 'Instant', sort_index: 4)
type_creature = CardType.create!(name: 'Creature', sort_index: 1)
CardType.create!(name: 'Enchantment', sort_index: 5)
CardType.create!(name: 'Sorcery', sort_index: 3)
type_land = CardType.create!(name: 'Land', sort_index: 7)
CardType.create!(name: 'Planeswalker', sort_index: 2)
CardType.create!(name: 'Artifact', sort_index: 6)

Color.create!(name: 'White', abbreviation: 'W', sort_index: 1)
Color.create!(name: 'Blue', abbreviation: 'U', sort_index: 2)
color_black = Color.create!(name: 'Black', abbreviation: 'B', sort_index: 3)
color_red = Color.create!(name: 'Red', abbreviation: 'R', sort_index: 4)
Color.create!(name: 'Green', abbreviation: 'G', sort_index: 5)
color_land = Color.create!(name: 'Land', abbreviation: 'L', sort_index: 6)

Card.create!(name: 'Daring Buccaneer', card_type: type_creature, card_set: set_rix, colors: [color_red], quantity: 3)
Card.create!(name: 'Rigging Runner', card_type: type_creature, card_set: set_xln, colors: [color_red], quantity: 1)
Card.create!(name: 'Dire Fleet Poisoner', card_type: type_creature, card_set: set_rix, colors: [color_black], quantity: 2)
Card.create!(name: 'Captain Lannery Storm', card_type: type_creature, card_set: set_xln, colors: [color_red], quantity: 1)
Card.create!(name: 'Forerunner of the Coalition', card_type: type_creature, card_set: set_rix, colors: [color_black], quantity: 2)
Card.create!(name: 'Evolving Wilds', card_type: type_land, card_set: set_rix, colors: [color_land], quantity: 4)
Card.create!(name: 'Ruin Raider', card_type: type_creature, card_set: set_xln, colors: [color_black], quantity: 1)
Card.create!(name: 'Murder', card_type: type_instant, card_set: set_m19, colors: [color_black], quantity: 2)
Card.create!(name: 'Lightning Strike', card_type: type_instant, card_set: set_xln, colors: [color_red], quantity: 4)
Card.create!(name: 'Dire Fleet Neckbreaker', card_type: type_creature, card_set: set_rix, colors: [color_red, color_black], quantity: 3)

# m19,r,lightning strike,instant
# rix,br,Dire Fleet Neckbreaker,creature
# set_m19,color_red,'Lightning Strike',type_instant
