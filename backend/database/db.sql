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
    seller_id int not null,
    product_name varchar(20),
    price int not null,
    quantity int,
    image_url varchar(255),
    release_date datetime default current_timestamp,
    foreign key (seller_id) references User (user_id) on delete cascade
);

create table Cart (
    cart_id int primary key not null auto_increment,
    product_id int, 
	customer_id int,  
    quantity int,
    foreign key (customer_id) references User (user_id) on delete cascade,
    foreign key (product_id) references Product (product_id) on delete cascade
);

create table Transaction (
    transaction_id int primary key not null auto_increment,
    customer_id int,
    product_id int,
    quantity int, 
    purchase_price int,
    purchase_date datetime default current_timestamp,
    foreign key (customer_id) references User (user_id) on delete cascade,
    foreign key (product_id) references Product (product_id) on delete cascade
);