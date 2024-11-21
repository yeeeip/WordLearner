CREATE FUNCTION words_learned() RETURNS trigger AS $words_learned$
    BEGIN
        IF NEW.words_learned >= 100 THEN
            UPDATE user_achievements SET achieved = true
            WHERE achievement_id = '895d6292-7ff5-4973-92aa-a51c4640def0' AND
            user_id = (SELECT id from app_user WHERE user_stats_id = NEW.id);
        END IF;
        IF NEW.words_learned >= 50 THEN
            UPDATE user_achievements SET achieved = true
            WHERE achievement_id = '0bf912a3-b2cf-4b1c-9657-2ee687056524' AND
            user_id = (SELECT id from app_user WHERE user_stats_id = NEW.id);
        END IF;
        IF NEW.words_learned >= 20 THEN
            UPDATE user_achievements SET achieved = true
            WHERE achievement_id = 'aab958f5-67a7-44f1-8082-826a700f9423' AND
            user_id = (SELECT id from app_user WHERE user_stats_id = NEW.id);
        END IF;
    RETURN NEW;
    END;
$words_learned$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER check_words_learned
    AFTER UPDATE OF words_learned ON user_statistics
    FOR EACH ROW EXECUTE FUNCTION words_learned();