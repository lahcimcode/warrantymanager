package pl.michal.WarrantyManager.service;

import pl.michal.WarrantyManager.user.User;

public interface UserService {

    User createUser(User user);

    void deleteAuthenticatedUser();

    User updateUser(Long id, User user);

    User getAuthenticatedUser();

    boolean activateUser(String activationCode);
}
