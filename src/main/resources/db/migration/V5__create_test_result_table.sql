create table submission (
    id uuid primary key,
    result integer not null,
    last_submission timestamp not null,
    module_id uuid,
    user_id uuid,

    foreign key(module_id) references module(id),
    foreign key(user_id) references app_user(id)
)