package pl.michal.WarrantyManager.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.michal.WarrantyManager.repository.RoleRepository;
import pl.michal.WarrantyManager.service.UserService;
import pl.michal.WarrantyManager.user.User;
import pl.michal.WarrantyManager.user.UserRepository;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.Optional;
import java.util.Random;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    @Value("${activationCodeLength:24}")
    private int activationCodeLength;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EntityExistsException("Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setActive(false);
        user.setActivationCode(createActivationCode(activationCodeLength));
        user.setRole(roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new EntityNotFoundException("Default role not fount in database")));
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, User user) {
        User userDb = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with id: " + id + " doesn't exist in database"));
        if (user.getFirstName() != null) {
            userDb.setFirstName(user.getFirstName());
        }
        if (user.getLastName() != null) {
            userDb.setLastName(user.getLastName());
        }
        if (user.getMobileNumber() != null) {
            userDb.setMobileNumber(user.getMobileNumber());
        }
        if (user.getAvatar() != null) {
            userDb.setAvatar(user.getAvatar());
        }
        if (user.getStreet() != null) {
            userDb.setStreet(user.getStreet());
        }
        if (user.getCity() != null) {
            userDb.setCity(user.getCity());
        }
        if (user.getPostalCode() != null) {
            userDb.setPostalCode(user.getPostalCode());
        }
        if (user.getSignature() != null) {
            userDb.setSignature(user.getSignature());
        }
        return userRepository.save(userDb);
    }

    @Override
    @Transactional
    public void deleteAuthenticatedUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        userRepository.deleteByEmail(email);
    }

    @Override
    public User getAuthenticatedUser() {
        System.out.println(SecurityContextHolder.getContext().getAuthentication());
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User with email: " + email + " doesn't exist in database"));
    }

    @Override
    public boolean activateUser(String activationCode) {
        Optional<User> userDb = userRepository.findByActivationCode(activationCode);
        if (userDb.isPresent()) {
            User activatedUser = userDb.get();
            activatedUser.setActivationCode(null);
            activatedUser.setActive(true);
            userRepository.save(activatedUser);
            return true;
        }
        return false;
    }

    private String createActivationCode(int length) {
        String allowedChars = "abcdefghijklmnoprstuwqxyzABCDEFGHIJKLMNOPRSTUWQXYZ0123456789";
        StringBuffer activationCode = new StringBuffer(length);
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            activationCode.append(allowedChars.charAt(random.nextInt(allowedChars.length())));
        }
        return activationCode.toString();
    }


}
