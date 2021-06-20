create database perntodo;

create table todo (
  todo_id serial not null primary key,
  description varchar(255)
);