create table owners (
    id serial primary key ,
    name text,
    phone_number varchar(20)
    -- do owner have 1 pet or many?
    --pet_id integer reference pets (id), -- :(
);

create table pets (
    id serial primary key,
    name text,
    -- if you want to limit the # of characters  = verchar(50)
    species varchar(100),
    --instead of age, derive the age from a bday
    birthdate date,
    -- if pets have one owner then put the foreign key right HERE
    owner_id integer references owners (id)
);


create table pets_owners (
    owner_id integer references owners (id),
    pet_id integer references pets (id)
);