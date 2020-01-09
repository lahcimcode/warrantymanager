package pl.michal.WarrantyManager.service;

import pl.michal.WarrantyManager.domain.UsersGroup;

public interface UsersGroupService {

    UsersGroup createUsersGroup(UsersGroup usersGroup);

    UsersGroup getUsersGroup(Long id);

}
