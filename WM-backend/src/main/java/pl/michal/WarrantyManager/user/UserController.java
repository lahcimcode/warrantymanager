package pl.michal.WarrantyManager.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.michal.WarrantyManager.service.UserService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/new")
    public User createUser(@RequestBody @Valid User user) {
        return userService.createUser(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping
    public void deleteAuthenticatedUser() {
        userService.deleteAuthenticatedUser();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public User getAuthenticatedUser() {
        return userService.getAuthenticatedUser();
    }

    @GetMapping("/activateuser")
    public boolean activateUser(@RequestParam String activationCode) {
        return userService.activateUser(activationCode);
    }

}