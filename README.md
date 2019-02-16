# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

---

## Updating Card Sets

1. Create card set file

    Use following format:
    ```
    <set_abbreviation>,"<card_name>"
    ```
    and save file as:
    ```
    <set_abbreviation>.csv
    ```

2. Add new card set to database

    ```
    insert into card_sets (name, abbreviation, created_at, updated_at)
    values (<set_name>, <set_abbreviation>, current_timestamp, current_timestamp);
    ```
    **Note:** Make sure to upcase set_abbreviation

3. Execute rake task
    ```
    heroku run "rake magic_suitcase:load_card_set['<set_abbreviation>']"
    ```