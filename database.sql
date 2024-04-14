CREATE SCHEMA IF NOT EXISTS UserManagerDB;

create table `sexes`(
	id int not null auto_increment,
	name varchar(100) not null unique check(length(name) >= 2),
	primary key (id)
);

create table `roles`(
	id int not null auto_increment,
	name varchar(100) not null unique check(length(name) >= 2),
	state int not null default 3,
	primary key (id)
);

create table `users`(
	id int not null auto_increment,
	username varchar(100) not null unique check(length(username) >= 2),
	password varchar(520) not null check(length(password)>=120),
	salt varchar(32) not null check(length(salt)=32),
	state int not null default 3,
	first_name varchar(100) null check(length(first_name) >= 2),
	last_name varchar(100) null check(length(last_name) >= 2),
	sex_id int null,
	foreign key (sex_id) references sexes(id) on update cascade on delete restrict,
	primary key (id)
);

create table `user_roles`(
	user_id int not null,
	role_id int not null,
	foreign key (user_id) references users(id) on update cascade on delete restrict,
	foreign key (role_id) references roles(id) on update cascade on delete restrict,
	primary key (user_id, role_id)
);

create table usermanagerdb.`user_logins`(
	id int not null auto_increment,
	token text not null check(length(token)>=2),
	ip varchar(50) not null check(length(ip)>=2),
	created_dt timestamp not null default now(),
	user_id int not null,
	foreign key (user_id) references users(id) on update cascade on delete restrict,
	primary key(id)
);

create table usermanagerdb.`role_rights`(
	id int not null auto_increment,
	role_id int not null,
	resource varchar(100) not null,
	controller_method varchar(20) not null,
	foreign key (role_id) references roles(id) on update cascade on delete restrict,
	primary key(id)
);

create table usermanagerdb.`refresh_tokens`(
	id int not null auto_increment,
	token text not null check(length(token)>=2),
	ip varchar(50) not null check(length(ip)>=2),
	created_dt timestamp not null default now(),
	expired_dt timestamp not null default DATE_ADD(NOW(), INTERVAL 1440 MINUTE),
	number_of_times int not null default 5,
	user_id int not null,
	foreign key (user_id) references users(id) on update cascade on delete restrict,
	primary key(id)
);

insert into roles(name) values('USER');
insert into roles(name) values('ADMIN');

insert into sexes(name) values('MALE');
insert into sexes(name) values('FEMALE');
insert into sexes(name) values('OTHER');
