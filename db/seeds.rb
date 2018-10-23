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

Card.create!(name: 'Daring Buccaneer', card_set: set_rix, quantity: 3)
Card.create!(name: 'Rigging Runner', card_set: set_xln, quantity: 1)
Card.create!(name: 'Dire Fleet Poisoner', card_set: set_rix, quantity: 2)
Card.create!(name: 'Captain Lannery Storm', card_set: set_xln, quantity: 1)
Card.create!(name: 'Forerunner of the Coalition', card_set: set_rix, quantity: 2)
Card.create!(name: 'Evolving Wilds', card_set: set_rix, quantity: 4)
Card.create!(name: 'Ruin Raider', card_set: set_xln, quantity: 1)
Card.create!(name: 'Murder', card_set: set_m19, quantity: 2)
Card.create!(name: 'Lightning Strike', card_set: set_xln, quantity: 4)
Card.create!(name: 'Dire Fleet Neckbreaker', card_set: set_rix, quantity: 3)

# m19,r,lightning strike,instant
# rix,br,Dire Fleet Neckbreaker,creature
# set_m19,color_red,'Lightning Strike',type_instant
