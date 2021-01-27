## Server Setup
```
npm install
```

## Start Server
```
npm run dev
```

**Sample API Request**
----
* **GET INVOICES**
  * **url:** `https://localhost:3000/invoice` <br>
  * **method** `GET` <br>
  * **data:** `-`


* **POST PRODUCT (product)**
  * **url:** `https://localhost:3000/products` <br>
  * **method** `POST` <br>
  * **data:** 
    ```js
    {
      "invoice_no": 1,
      "item_name": "Handphone",
      "quantity": 4,
      "total_cost": 20000,
      "total_price": 1000000
    }
    ```

* **POST INVOICE (CSV)**
  * **url:** `https://localhost:3000/invoice/csv` <br>
  * **method** `POST` <br>
  * **data:** `insert excel into form-data in postman`

* **POST INVOICE (JSON data)**
  * **url:** `https://localhost:3000/invoice` <br>
  * **method** `POST` <br>
  * **data:**
    ```js
    {
      "invoice_no": 13,
      "date": "04-02-2021",
      "customer": "tae",
      "salesperson": "doe",
      "payment_type": "CASH",
      "notes": "Lorem Ipsum"
    }
    ``` 

* **PUT INVOICE**
  * **url:** `https://localhost:3000/invoice/:invoice_no` <br>
  * **method** `PUT` <br>
  * **data:**
  ```js
    {
      "date": "04-02-2021",
      "customer": "tae",
      "salesperson": "doe",
      "payment_type": "CASH",
      "notes": "Lorem Ipsum"
    }
  ```

* **DELETE INVOICE**
  * **url:** `https://localhost:3000/invoice/invoice_no` <br>
  * **method:** `DELETE` <br>
  * **data:** `-`