require 'rails_helper'

describe 'LoadDeck' do
  describe '#load_deck' do
    let(:card_set_dom) { FactoryBot.create(:card_set, name: 'Dominaria', abbreviation: 'DOM') }
    let(:card_set_grn) { FactoryBot.create(:card_set, name: 'Guilds of Ravnica', abbreviation: 'GRN') }

    context "when I don't own any of desired card" do
      it 'builds order with desired quantity and card' do
        card_set = FactoryBot.create(:card_set, name: 'Dominaria', abbreviation: 'DOM')

        FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set, quantity: 0)

        subject = LoadDeck.new
        results = subject.load_deck([{ quantity: 4, name: 'Luminous Bonds' }])

        expect(results[:order]).to eq([
          { quantity: 4, name: 'Luminous Bonds' }
        ])
        expect(results[:picklist]).to be_empty
      end
    end

    context "when I own exact quantity of desired card" do
      it 'builds empty order' do
        card_set = FactoryBot.create(:card_set, name: 'Dominaria', abbreviation: 'DOM')

        FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set, quantity: 4)

        subject = LoadDeck.new
        results = subject.load_deck([{ quantity: 4, name: 'Luminous Bonds' }])

        expect(results[:order]).to be_empty
        expect(results[:picklist]).to eq([
          { quantity: 4, name: 'Luminous Bonds', card_set: 'DOM' }
        ])
      end
    end

    context "when I own more of desired card than desired" do
      it 'builds empty order' do
        card_set = FactoryBot.create(:card_set, name: 'Dominaria', abbreviation: 'DOM')

        FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set, quantity: 8)

        subject = LoadDeck.new
        results = subject.load_deck([{ quantity: 4, name: 'Luminous Bonds' }])

        expect(results[:order]).to be_empty
        expect(results[:picklist]).to eq([
          { quantity: 4, name: 'Luminous Bonds', card_set: 'DOM' }
        ])
      end
    end

    context "when I own less of desired card than desired" do
      it 'builds order with needed quantity and card' do
        card_set = FactoryBot.create(:card_set, name: 'Dominaria', abbreviation: 'DOM')

        FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set, quantity: 2)

        subject = LoadDeck.new
        results = subject.load_deck([{ quantity: 4, name: 'Luminous Bonds' }])

        expect(results[:order]).to eq([
          { quantity: 2, name: 'Luminous Bonds' }
        ])
        expect(results[:picklist]).to eq([
          { quantity: 2, name: 'Luminous Bonds', card_set: 'DOM' }
        ])
      end
    end

    context 'when same card exists in multiple sets' do
      context "when I don't own any of desired card" do
        it 'builds order with desired quantity and card' do
          FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set_dom, quantity: 0)
          FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set_grn, quantity: 0)

          subject = LoadDeck.new
          results = subject.load_deck([{ quantity: 4, name: 'Luminous Bonds' }])

          expect(results[:order]).to eq([
            { quantity: 4, name: 'Luminous Bonds' }
          ])
          expect(results[:picklist]).to be_empty
        end
      end

      context "when I own exact quantity of desired card in one set" do
        it 'builds empty order' do
          FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set_dom, quantity: 4)
          FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set_grn, quantity: 0)

          subject = LoadDeck.new
          results = subject.load_deck([{ quantity: 4, name: 'Luminous Bonds' }])

          expect(results[:order]).to be_empty
          expect(results[:picklist]).to eq([
            { quantity: 4, name: 'Luminous Bonds', card_set: 'DOM' }
          ])
        end
      end

      context "when I own exact quantity of desired card across sets" do
        it 'builds empty order' do
          FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set_dom, quantity: 2)
          FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set_grn, quantity: 2)

          subject = LoadDeck.new
          results = subject.load_deck([{ quantity: 4, name: 'Luminous Bonds' }])

          expect(results[:order]).to be_empty
          expect(results[:picklist]).to eq([
            { quantity: 2, name: 'Luminous Bonds', card_set: 'DOM' },
            { quantity: 2, name: 'Luminous Bonds', card_set: 'GRN' },
          ])
        end
      end

      context "when I own more of desired card than desired in one set" do
        it 'builds empty order' do
          FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set_dom, quantity: 8)
          FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set_grn, quantity: 0)

          subject = LoadDeck.new
          results = subject.load_deck([{ quantity: 4, name: 'Luminous Bonds' }])

          expect(results[:order]).to be_empty
          expect(results[:picklist]).to eq([
            { quantity: 4, name: 'Luminous Bonds', card_set: 'DOM' }
          ])
        end
      end

      context "when I own more of desired card than desired in across sets" do
        it 'builds empty order' do
          FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set_dom, quantity: 4)
          FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set_grn, quantity: 4)

          subject = LoadDeck.new
          results = subject.load_deck([{ quantity: 4, name: 'Luminous Bonds' }])

          expect(results[:order]).to be_empty
          expect(results[:picklist]).to eq([
            { quantity: 4, name: 'Luminous Bonds', card_set: 'DOM' }
          ])
        end
      end

      context "when I own less of desired card than desired in one set" do
        it 'builds empty order' do
          FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set_dom, quantity: 2)
          FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set_grn, quantity: 0)

          subject = LoadDeck.new
          results = subject.load_deck([{ quantity: 4, name: 'Luminous Bonds' }])

          expect(results[:order]).to eq([
            { quantity: 2, name: 'Luminous Bonds' }
          ])
          expect(results[:picklist]).to eq([
            { quantity: 2, name: 'Luminous Bonds', card_set: 'DOM' }
          ])
        end
      end

      context "when I own less of desired card than desired in across sets" do
        it 'builds empty order' do
          FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set_dom, quantity: 1)
          FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set_grn, quantity: 1)

          subject = LoadDeck.new
          results = subject.load_deck([{ quantity: 4, name: 'Luminous Bonds' }])

          expect(results[:order]).to eq([
            { quantity: 2, name: 'Luminous Bonds' }
          ])
          expect(results[:picklist]).to eq([
            { quantity: 1, name: 'Luminous Bonds', card_set: 'DOM' },
            { quantity: 1, name: 'Luminous Bonds', card_set: 'GRN' },
          ])
        end
      end
    end

    context 'when deck list has multiple cards' do
      context "when I own less of desired card than desired in across sets" do
        it 'builds empty order' do
          FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set_dom, quantity: 1)
          FactoryBot.create(:card, name: 'Luminous Bonds', card_set: card_set_grn, quantity: 1)
          FactoryBot.create(:card, name: 'Shock', card_set: card_set_dom, quantity: 1)
          FactoryBot.create(:card, name: 'Shock', card_set: card_set_grn, quantity: 1)

          subject = LoadDeck.new
          results = subject.load_deck([
            { quantity: 4, name: 'Luminous Bonds' },
            { quantity: 4, name: 'Shock' },
          ])

          expect(results[:order]).to eq([
            { quantity: 2, name: 'Luminous Bonds' },
            { quantity: 2, name: 'Shock' },
          ])
          expect(results[:picklist]).to match_array([
            { quantity: 1, name: 'Luminous Bonds', card_set: 'DOM' },
            { quantity: 1, name: 'Shock', card_set: 'DOM' },
            { quantity: 1, name: 'Luminous Bonds', card_set: 'GRN' },
            { quantity: 1, name: 'Shock', card_set: 'GRN' },
          ])
        end
      end
    end
  end
end
