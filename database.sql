create table `sexes`(
	id int not null auto_increment,
	name varchar(100) not null unique check(length(name) >= 2),
	primary key (id)
);

create table `roles`(
	id int not null auto_increment,
	name varchar(100) not null unique check(length(name) >= 2),
	state int not null default(3),
	primary key (id)
);

create table `users`(
	id int not null auto_increment,
	username varchar(100) not null unique check(length(username) >= 2),
	password varchar(512) not null check(length(password)=512),
	salt varchar(32) not null check(length(salt)=32),
	firstName varchar(100) null check(length(firstName) >= 2),
	lastName varchar(100) null check(length(lastName) >= 2),
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

insert into roles(name) values('USER');
insert into roles(name) values('ADMIN');
