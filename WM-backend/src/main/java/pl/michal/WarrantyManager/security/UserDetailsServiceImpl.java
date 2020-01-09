package pl.michal.WarrantyManager.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.michal.WarrantyManager.user.User;
import pl.michal.WarrantyManager.user.UserRepository;

import javax.persistence.EntityNotFoundException;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("UserDetailService - implementation");
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Wrong email address " + email));

        SimpleGrantedAuthority authorities = new SimpleGrantedAuthority(user.getRole().getName());

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(authorities)
//                .disabled(!user.isActive())
                .build();

    }
}
