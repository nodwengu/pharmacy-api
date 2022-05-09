# Pharmacy Services App

sudo -u postgres psql;
psql pharmacy_db 
Create a database called : `pharmacy_db` on PostgreSQL.
```
sudo -u postgres createdb pharmacy_db
```

Give your laptop user access to this database.
```
sudo -u postgres createuser <your username here> -P 
```

Now run psql as the postgres user:

```
sudo -u postgres psql;
```

Grant your user access to the `<your username here>` database by running this command:

```
grant all privileges on database `pharmacy_db` to <your username here>;
```

Create  the `facility` table in the database.

```
create table facility (
    id serial primary key not null,
    name text,
    address text,
    phone text
);
```

## Run the app

To run the app do an: `npm install` followed by `npm start`.



