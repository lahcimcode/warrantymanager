package pl.michal.WarrantyManager.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.michal.WarrantyManager.domain.UsersGroup;
import pl.michal.WarrantyManager.repository.UsersGroupRepository;
import pl.michal.WarrantyManager.service.UsersGroupService;

import javax.persistence.EntityNotFoundException;
import java.util.Collections;

@Service
public class UsersGroupServiceImpl implements UsersGroupService {

    private UsersGroupRepository usersGroupRepository;

    @Autowired
    public UsersGroupServiceImpl(UsersGroupRepository usersGroupRepository) {
        this.usersGroupRepository = usersGroupRepository;
    }

    @Override
    public UsersGroup createUsersGroup(UsersGroup usersGroup) {
        usersGroup.setUsers(Collections.singletonList(usersGroup.getAdmin()));
        return usersGroupRepository.save(usersGroup);
    }

    @Override
    public UsersGroup getUsersGroup(Long id) {
        return usersGroupRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("UsersGroup with id: " + id + " doesn't exist in database"));
    }


}
