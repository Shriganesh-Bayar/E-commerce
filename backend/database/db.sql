create database Ecommerce;
use Ecommerce;

create table User (
	user_id int primary key not null auto_increment,
    user_name varchar(20),
    email_id varchar(20),
    password varchar(100)
);

create table Product (
	product_id int primary key not null auto_increment,
    seller_id int,
    product_name varchar(20),
    price int,
    qunatity int,
    foreign key (seller_id) references User (user_id) on delete cascade
);

create table Cart (
	customer_id int,  
    product_id int, 
    item_state enum("Cart", "Bought"),
    purchased_date date,
    primary key (customer_id, product_id),
    foreign key (customer_id) references User (user_id) on delete cascade,
    foreign key (product_id) references Product (product_id) on delete cascade
);