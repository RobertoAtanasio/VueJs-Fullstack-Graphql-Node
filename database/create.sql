create schema namegator;

create table namegator.item (
	id serial,
	type text not null,
	description text not null
);

insert into namegator.item (type, description) values ('prefixos', 'Air');
insert into namegator.item (type, description) values ('prefixos', 'Jet');
insert into namegator.item (type, description) values ('prefixos', 'Flight');
insert into namegator.item (type, description) values ('sufixos', 'Hub');
insert into namegator.item (type, description) values ('sufixos', 'Station');
insert into namegator.item (type, description) values ('sufixos', 'Mart');