## Run Application

#### Requirements:
##### - Install Node and Angular CLI
####
##### To run Nodejs:
```bash
cd contactsApp/contactsApp-Nodejs
npm i && npm run dev
```

##### To run the Angular
```bash
cd contactsApp/contactsApp-Angular
npm i && ng serve -o
```

##### To run automatic tests
```bash
cd contactsApp-Nodejs
npm run test
```

##### Load contacts data endpoint: `GET /api/getTableData` 

##### Add contact endpoint: `POST /api/addContact`, data: 
``` js 
{
    name: 'JohnDoe',
    personalPhone: '111222333',
    workPhone: string,
    email?: string;
    company?: string;
    address?: string;
    birthday?: string
}
```

##### Delete contact endpoint: `POST /api/deleteContact`, data: 
```js
{ id: 'd567452f-fc51-47de-8fdb-1e45195215c3' }
```

##### Update contact endpoint: `PUT /api/updateContact`, data:
``` js 
{
    id: 'd567452f-fc51-47de-8fdb-1e45195215c3',
    name: 'John M Doe',
    personalPhone: '111222333444',
    workPhone: string,
    email?: string;
    company?: string;
    address?: string;
    birthday?: string
}
```
##
##### Search contact endpoints: 
`GET /searchContact/emailOrPhone?text=`
`GET /searchContact/address?text=`
`GET /searchContact/name?text=`

#### About the project
##### The frontend was made using Angular (RxJs and Angular Material), it consumes a REST API made with Nodejs (Express). The data is persisted in Hashmap. You can CREATE, UPDATE, DELETE and GET contacts. Also you can filter them by Address, Email, Phone and Name.

