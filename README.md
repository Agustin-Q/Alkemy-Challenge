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
### Backend
- [x] Set up DB
  - [x] Set up Migrations
  - [x] Set up Rollbacks
- [x] API:
  - [x] Account management:
    - [x] Set up route for creating account
    - [x] Set up route for login (auth with jwt)
  - [ ] Record management:
    - [x] Set up route for adding records
    - [x] Set up route for getting records
      - [x] Getting last n records
      - [ ] Getting records between dates (optional)
    - [x] Set up route for modifying records
    - [x] Set up route for deleting records
    - [x] Set up route for getting balance

### Frontend
- [ ] Start
- [ ] Pages
  - [ ] Signup
  - [ ] Login
  - [ ] Main
- [ ] Components
  - [ ] Menu Bar
  - [ ] Record Card
  - [ ] Add record button
  - [ ] Login Form
  - [ ] Signup form
