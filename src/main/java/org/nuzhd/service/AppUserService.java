package org.nuzhd.service;

import org.nuzhd.dto.request.UpdateUserDataRequest;
import org.nuzhd.dto.response.UpdateUserDataResponse;
import org.nuzhd.dto.response.UserProfileResponse;
import org.nuzhd.model.AppUser;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AppUserService {

    AppUser save(AppUser user);

    AppUser create(AppUser user);

    AppUser getByUsername(String username);

    UserDetailsService userDetailsService();

    AppUser getCurrentUser();

    UpdateUserDataResponse updateUserData(UpdateUserDataRequest updateUserDataRequest);

    UserProfileResponse getUserProfile(AppUser user);
}
