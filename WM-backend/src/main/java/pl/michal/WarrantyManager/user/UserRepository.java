package pl.michal.WarrantyManager.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    Optional<User> findByActivationCode(String activationCode);

    Optional<User> findByEmail(String email);

    void deleteByEmail(String email);


}
