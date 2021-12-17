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
    - [ ] Hash passwords in DB. 
  - [ ] Record management:
    - [x] Set up route for adding records
    - [x] Set up route for getting records
      - [x] Getting last n records
      - [ ] Getting records between dates (optional)
    - [x] Set up route for modifying records
    - [x] Set up route for deleting records
    - [x] Set up route for getting balance

### Frontend
- [x] Start
- [x] Pages
  - [x] Home
  - [x] SignUp
  - [x] LogIn
  - [x] Dashboard
- [x] Components
  - [ ] Menu Bar
  - [x] Record Card
  - [x] NewRecord
  - [x] Popup message
- [x] API Communication
  - [x] Log in
  - [x] Sign up
  - [x] Get last 5 records
  - [x] Get Balance
  - [x] Create new Record
  - [x] Update Record
  - [x] Delete Record
