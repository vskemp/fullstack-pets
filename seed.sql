insert into owners 
    (name, phone_number, hash)
values
    ('chris', '8675309', '$2a$10$nMO33hS/2hhh.Rxc9sn9bOv4bDTaC16TUvVRlTGZLHbahX1CW.W7O'),
    ('aylor', '5554321', '$2a$10$uDUtiJjdIcRw4Ctk034WguoIQIkFH2GRA5F4./cVG/UYJP.iG3f4C');


insert into pets
    (name, species, birthdate, owner_id)
values
    ('oakley', 'cat', '2010-05-30', 1),
    ('milla', 'tortoise shell', '2005-01-01', 1),
    ('dexter', 'dog', '2003-09-01', 2),
    ('hank', 'dog', '1999-03-14', 2),
    ('seymour', 'cat', '1901-12-25', 2);