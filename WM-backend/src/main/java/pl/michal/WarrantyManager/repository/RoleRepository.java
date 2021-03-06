package pl.michal.WarrantyManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.michal.WarrantyManager.domain.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String name);

}
