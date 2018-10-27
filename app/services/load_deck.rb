class LoadDeck
  def load_deck(deck_list)
    {
      order: generate_order(deck_list),
      picklist: generate_picklist(deck_list),
    }
  end

  private

  def generate_picklist(deck_list)
    deck_list.reduce([]) do |deck_picklist, deck_card|
      needed = deck_card[:quantity]

      Card.where(name: deck_card[:name]).reduce(deck_picklist) do |deck_picklist, card|
        owned = card.quantity

        picked = [needed, owned].min
        needed -= picked

        (owned > 0 && picked > 0) ? deck_picklist + picklist_line_item(card, picked) : deck_picklist
      end
    end
  end

  def picklist_line_item(card, picked)
    [{ quantity: picked, name: card.name, card_set: card.card_set.abbreviation }]
  end

  def generate_order(deck_list)
    deck_list.reduce([]) do |order, deck_card|
      needed = quantity_needed(deck_card)

      (needed > 0) ? order + [{ quantity: needed, name: deck_card[:name] }] : order
    end
  end

  def quantity_needed(deck_card)
    Card.where(name: deck_card[:name]).reduce(deck_card[:quantity]) do |needed, card|
      owned = card.quantity

      if owned >= needed
        0
      else
        [needed - owned, needed].min
      end
    end
  end
end
