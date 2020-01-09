package pl.michal.WarrantyManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.michal.WarrantyManager.domain.UsersGroup;
import pl.michal.WarrantyManager.service.UsersGroupService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/usersgroup")
public class UsersGroupController {

    private UsersGroupService usersGroupService;

    @Autowired
    public UsersGroupController(UsersGroupService usersGroupService) {
        this.usersGroupService = usersGroupService;
    }

    @PostMapping
    public UsersGroup createUsersGroup(@RequestBody @Valid UsersGroup usersGroup) {
        return usersGroupService.createUsersGroup(usersGroup);
    }

    @GetMapping("/{id}")
    public UsersGroup getUsersGroup(@PathVariable Long id) {
        return usersGroupService.getUsersGroup(id);
    }
}
