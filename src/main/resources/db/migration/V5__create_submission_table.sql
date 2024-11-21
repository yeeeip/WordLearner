create table submission (
    result integer not null,
    last_submission timestamp not null,
    module_id uuid,
    user_id uuid,
    pk_user_id uuid,
    pk_module_id uuid,

    primary key (pk_module_id, pk_user_id)
)