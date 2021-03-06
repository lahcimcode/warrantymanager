package pl.michal.WarrantyManager.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class PasswordEncoderConfig {

    @Value("${passwordEncoderStrength:12}")
    private int passwordEncoderStrength;

    @Bean
    public PasswordEncoder passwordEncoder() {
        System.out.println("PasswordEncoder");
        return new BCryptPasswordEncoder(passwordEncoderStrength);
    }
}
