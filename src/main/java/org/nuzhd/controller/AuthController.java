package org.nuzhd.controller;

import jakarta.validation.Valid;
import org.nuzhd.dto.request.LoginUserRequest;
import org.nuzhd.dto.request.RegisterUserRequest;
import org.nuzhd.dto.response.JwtAuthResponse;
import org.nuzhd.security.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/word-learner/api/v1/auth")
public class AuthController {

    private final AuthenticationService authenticationService;

    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<JwtAuthResponse> registerUser(@Valid @RequestBody RegisterUserRequest request) {
        return ResponseEntity
                .ok(authenticationService.signUp(request));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> loginUser(@Valid @RequestBody LoginUserRequest request) {
        return ResponseEntity
                .ok(authenticationService.signIn(request));
    }

}
