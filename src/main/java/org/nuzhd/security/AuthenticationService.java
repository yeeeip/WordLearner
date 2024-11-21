package org.nuzhd.security;

import org.nuzhd.dto.request.LoginUserRequest;
import org.nuzhd.dto.request.RegisterUserRequest;
import org.nuzhd.dto.response.JwtAuthResponse;
import org.nuzhd.exception.PasswordsDoNotMatchException;
import org.nuzhd.model.AppUser;
import org.nuzhd.model.UserRole;
import org.nuzhd.model.UserStatistics;
import org.nuzhd.security.jwt.JwtService;
import org.nuzhd.service.AchievementService;
import org.nuzhd.service.impl.AppUserServiceImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final AppUserServiceImpl userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final AchievementService achievementService;

    public AuthenticationService(AppUserServiceImpl userService, JwtService jwtService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, AchievementService achievementService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.achievementService = achievementService;
    }

    public JwtAuthResponse signUp(RegisterUserRequest request) {
        if (!request.password().equals(request.passwordConfirmation())) {
            throw new PasswordsDoNotMatchException("Пароли не совпадают");
        }

        var user = new AppUser(
                request.username(),
                request.email(),
                passwordEncoder.encode(request.password()),
                achievementService.findAll(),
                new UserStatistics(),
                UserRole.ROLE_USER
        );

        userService.create(user);

        var jwt = jwtService.generateToken(user);

        return new JwtAuthResponse(jwt, jwtService.extractRole(jwt));
    }

    public JwtAuthResponse signIn(LoginUserRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.email(),
                request.password()
        ));

        var user = userService
                .userDetailsService()
                .loadUserByUsername(request.email());

        var jwt = jwtService.generateToken(user);

        return new JwtAuthResponse(jwt, jwtService.extractRole(jwt));
    }
}