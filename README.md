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
  - [ ] Account management:
    - [ ] Set up route for creating account
    - [ ] Set up route for login (auth with jwt)
