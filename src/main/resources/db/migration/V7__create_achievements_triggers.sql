CREATE FUNCTION modules_completed() RETURNS trigger AS $modules_completed$
    BEGIN
        IF NEW.modules_completed >= 300 THEN
            UPDATE user_achievements SET achieved = true
            WHERE achievement_id = '11f92ac5-e89c-43cf-be23-021c162c63da' AND
            user_id = (SELECT id from app_user WHERE user_stats_id = NEW.id);
        END IF;
        IF NEW.modules_completed >= 100 THEN
            UPDATE user_achievements SET achieved = true
            WHERE achievement_id = '5ec2eb55-d023-45ff-9ce2-d61e90b19f67' AND
            user_id = (SELECT id from app_user WHERE user_stats_id = NEW.id);
        END IF;
        IF NEW.modules_completed >= 40 THEN
            UPDATE user_achievements SET achieved = true
            WHERE achievement_id = 'a4b45d35-dcd5-4ce9-bc98-01a01a5f15ed' AND
            user_id = (SELECT id from app_user WHERE user_stats_id = NEW.id);
        END IF;
        IF NEW.modules_completed >= 15 THEN
            UPDATE user_achievements SET achieved = true
            WHERE achievement_id = '0e3d0b4e-84fc-4b1c-b457-2da842481fbd' AND
            user_id = (SELECT id from app_user WHERE user_stats_id = NEW.id);
        END IF;
        IF NEW.modules_completed >= 10 THEN
            UPDATE user_achievements SET achieved = true
            WHERE achievement_id = '264cca69-6339-41a7-9ec0-3dc149ffb628' AND
            user_id = (SELECT id from app_user WHERE user_stats_id = NEW.id);
        END IF;
        IF NEW.modules_completed >= 3 THEN
            UPDATE user_achievements SET achieved = true
            WHERE achievement_id = '247f4a98-e625-4160-ac51-14eb23b7c843' AND
            user_id = (SELECT id from app_user WHERE user_stats_id = NEW.id);
        END IF;
        IF NEW.modules_completed >= 1 THEN
            UPDATE user_achievements SET achieved = true
            WHERE achievement_id = 'a304792f-d654-448e-92f1-5b3213944c51' AND
            user_id = (SELECT id from app_user WHERE user_stats_id = NEW.id);
        END IF;
    RETURN NEW;
    END;
$modules_completed$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER check_learned_modules
    AFTER UPDATE OF modules_completed ON user_statistics
    FOR EACH ROW EXECUTE FUNCTION modules_completed();