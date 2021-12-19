# Alkemy-Challenge
Este es la entrada mia para el Challenge de Alkemy.

La consigna: ["Challenge Full stack - JavaScript](Challenge Full stack - JavaScript.rev2.pdf")

---
###  Notas / Aclaraciones:
En el codigo utilicé "Debit" y "Credit" para hacer referencia a "Egreso" e "Ingreso" respectivamente. Luego me di cuenta que tal vez es mas descriptivo utilizar "Expense" e "Income".

"Dashboard" seria el home del usuario donde puede ver su balance, los ultimos registros agregar nuevos registros.

"Login" es donde el usuario se puede autentificar y el front end recibe el Token

"Signup" es donde se puede registra un nuevo usuario.

"Home" que esta en la raiz del url es de donde se puede navegar a las distintas paginas, el link a Dashboard esta oculto si no hay un token. Aca podria haber alguna presentacion de lo que hace la aplicacion.

---
### Algunas cosas que todavia pueden mejorase:

Los mensajes de estilo "Popup" solo estan implementados en la pagina de "login" y "signup", extender la implementacion al resto de la aplicacion.

Crear animaciones de carga (loaders) mientras se espera la respuesta del backend. En un ambiente de desarrollo el tiempo de respuesta es despreciable, pero en un ambiente productivo pueden ser varios segundos y el usuario debe saber que la aplicacion esta esperando.

Agregar redirects automaticos una vez que un usuario ingreso o tiene un token valido dirigirlo directamente a la pagina "Dashboard".

Verificar y eliminar el JWT cuando este llegando al fin de su validez, actualmente el front end va a hacer request con el token expirado y va a recibir un error de "Auth Failed" del backend.

Hashear las contraseñas de los usuarios en la base de datos. Actualmente se almacenan como texto, esto es un riesgo grande de seguridad si la base de datos llegara a ser comprometida por un agente externo o interno.

Agregar endpoints para consultar datos estadisticos como egresos por categoria, egresos diarios, mensuales, etc.

Agregar endpoint para recuperar contraseña 

Mejorar el manejo de errores para que sea consistente dentro de toda la aplicación

Mejorar la documentacion, algunas partes estan documentadas extensivamente y otras no tanto.

---
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
  * date -> notNullable
  * Account_id -> notNullable

---
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
