# Alkemy-Challenge

## DB structure
* Account (table)
  * email -> notNullable, unique
  * name -> notNullable
  * password -> notNullable
* Record (table)
  * amount -> notNullable
  * type -> enum ['Credit' , 'Debit']
  * category
  * description
  * Account_id -> notNullable

## To do:
- [x] Set up DB
  - [x] Set up Migrations
  - [x] Set up Rollbacks
- [ ] API:
  - [x] Account management:
    - [x] Set up route for creating account
    - [x] Set up route for login (auth with jwt)
  - [ ] Record management:
    - [x] Set up route for adding records
    - [ ] Set up route for getting records
      - [ ] Getting last n records
      - [ ] Getting records between dates
    - [ ] Set up route for getting balance
