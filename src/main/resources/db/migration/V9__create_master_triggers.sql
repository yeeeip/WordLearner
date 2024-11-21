CREATE FUNCTION master_achievements() RETURNS trigger AS $master_achievements$
    BEGIN
        IF NEW.tests_completed >= 5 THEN
            UPDATE user_achievements SET achieved = true
            WHERE achievement_id = 'c211d6ec-787a-4656-8c51-b3459b20833c' AND
            user_id = (SELECT id from app_user WHERE user_stats_id = NEW.id);
        END IF;
        IF NEW.cards_completed >= 5 THEN
            UPDATE user_achievements SET achieved = true
            WHERE achievement_id = '1d1dfe29-9286-4f60-b361-01e16288d202' AND
            user_id = (SELECT id from app_user WHERE user_stats_id = NEW.id);
        END IF;
        IF NEW.matches_completed >= 5 THEN
            UPDATE user_achievements SET achieved = true
            WHERE achievement_id = '41035b72-e817-4ee6-b2fe-35c38c2d884c' AND
            user_id = (SELECT id from app_user WHERE user_stats_id = NEW.id);
        END IF;
    RETURN NEW;
    END;
$master_achievements$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER check_master_achievements
    AFTER UPDATE ON user_statistics
    FOR EACH ROW EXECUTE FUNCTION master_achievements();