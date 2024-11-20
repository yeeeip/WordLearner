package org.nuzhd.service.impl;

import org.nuzhd.dto.AchievementDto;
import org.nuzhd.dto.request.UpdateUserDataRequest;
import org.nuzhd.dto.response.UpdateUserDataResponse;
import org.nuzhd.dto.response.UserProfileResponse;
import org.nuzhd.exception.EmailExistsException;
import org.nuzhd.exception.UsernameExistsException;
import org.nuzhd.model.AchievementCategory;
import org.nuzhd.model.AppUser;
import org.nuzhd.repo.AchievementRepository;
import org.nuzhd.repo.AppUserRepository;
import org.nuzhd.security.jwt.JwtService;
import org.nuzhd.service.AchievementService;
import org.nuzhd.service.AppUserService;
import org.nuzhd.utils.Mappers;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.EnumMap;
import java.util.List;

@Service
public class AppUserServiceImpl implements AppUserService {

    private final AppUserRepository repository;
    private final JwtService jwtService;

    private final AchievementService achievementService;

    private final AchievementRepository achievementRepository;

    public AppUserServiceImpl(AppUserRepository repository, JwtService jwtService,
                              AchievementService achievementService,
                              AchievementRepository achievementRepository) {
        this.repository = repository;
        this.jwtService = jwtService;
        this.achievementService = achievementService;
        this.achievementRepository = achievementRepository;
    }

    public AppUser save(AppUser user) {
        return repository.save(user);
    }

    public AppUser create(AppUser user) {
        if (repository.existsByUsername(user.getUsername())) {
            throw new UsernameExistsException("Пользователь с таким именем уже существует");
        }

        if (repository.existsByEmail(user.getEmail())) {
            throw new EmailExistsException("Пользователь с таким email уже существует");
        }

        return save(user);
    }

    public AppUser getByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));

    }

    public AppUser getByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));

    }

    public UserDetailsService userDetailsService() {
        return this::getByEmail;
    }

    public AppUser getCurrentUser() {
        var username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return getByUsername(username);
    }

    public UserProfileResponse getUserProfile(AppUser user) {
        List<AchievementDto> achieved = achievementRepository.findAllAchievedByUser(user.getId());

        EnumMap<AchievementCategory, List<AchievementDto>> achievements = new EnumMap<>(AchievementCategory.class);
        for (AchievementCategory c : AchievementCategory.values()) {
            List<AchievementDto> achievedByCategory = achieved.stream()
                    .filter(ac -> c == ac.category())
                    .toList();
            achievements.put(c, achievedByCategory);
        }

        return new UserProfileResponse(
                user.getUsername(),
                user.getEmail(),
                Mappers.fromUserStatsToStatsDto.apply(user.getUserStats()),
                achievements
        );
    }

    @Override
    public UpdateUserDataResponse updateUserData(UpdateUserDataRequest updateUserDataRequest) {
        AppUser user = getCurrentUser();

        if (!user.getEmail().equals(updateUserDataRequest.email()) && repository.existsByEmail(updateUserDataRequest.email())) {
            throw new EmailExistsException("Пользователь с таким email уже существует");
        }

        if (!user.getUsername().equals(updateUserDataRequest.username()) && repository.existsByUsername(updateUserDataRequest.username())) {
            throw new UsernameExistsException("Пользователь с таким логином уже существует");
        }

        user.setUsername(updateUserDataRequest.username());
        user.setEmail(updateUserDataRequest.email());

        AppUser updatedUser = save(user);

        String jwt = jwtService.generateToken(updatedUser);

        return new UpdateUserDataResponse(updatedUser.getUsername(), updatedUser.getEmail(), jwt);
    }
}