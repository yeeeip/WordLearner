alter table module add author_id uuid not null;

alter table module add foreign key (author_id) references app_user(id);