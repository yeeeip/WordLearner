package org.nuzhd.controller;

import jakarta.validation.Valid;
import org.nuzhd.dto.request.UpdateUserDataRequest;
import org.nuzhd.dto.response.UpdateUserDataResponse;
import org.nuzhd.dto.response.UserProfileResponse;
import org.nuzhd.model.AppUser;
import org.nuzhd.service.AppUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/word-learner/api/v1/profile")
public class ProfileController {

    private final AppUserService userService;

    public ProfileController(AppUserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<UserProfileResponse> getProfilePage() {
        AppUser user = userService.getCurrentUser();
        UserProfileResponse response = userService.getUserProfile(user);

        return ResponseEntity
                .ok(response);
    }

    @PatchMapping
    public ResponseEntity<UpdateUserDataResponse> updateUserData(@Valid @RequestBody UpdateUserDataRequest request) {
        UpdateUserDataResponse response = userService.updateUserData(request);

        return ResponseEntity
                .ok(response);
    }
}
