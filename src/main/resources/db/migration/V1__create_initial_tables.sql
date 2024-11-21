create table if not exists module (
    id uuid primary key,
    title varchar not null,
    word_count integer not null,
    created_at timestamp not null default(current_timestamp),
    description varchar
);

create table if not exists word_card (
    id uuid primary key,
    word_en varchar not null,
    word_ru varchar not null,
    card_img varchar default 'https://open-air.ru/templates/open_air/img/placeholder.png',
    module_id uuid,
    foreign key (module_id) references module(id)
);

create table if not exists user_statistics (
    id uuid primary key,
    current_streak integer not null default 0,
    modules_created integer not null default 0,
    cards_completed integer not null default 0,
    matches_completed integer not null default 0,
    words_learned integer not null default 0,
    modules_completed integer not null default 0,
    tests_completed integer not null default 0
);

create table if not exists app_user (
    id uuid primary key,
    username varchar not null,
    email varchar not null,
    password varchar not null,
    user_stats_id uuid not null,
    role varchar not null,

    foreign key (user_stats_id) references user_statistics(id),
    constraint role_c check (role in ('ROLE_ADMIN', 'ROLE_USER'))
);

create table if not exists achievements (
    id uuid primary key,
    category varchar not null,
    name varchar not null,

    constraint category_c check ( category in ('LEARNING', 'STREAK', 'MODULES_LEARNED'))
);

create table if not exists user_achievements (
    user_id uuid not null,
    achievement_id uuid not null,
    achieved boolean default false,

    foreign key (user_id) references app_user(id),
    foreign key (achievement_id) references achievements(id),
    primary key (user_id, achievement_id)
);