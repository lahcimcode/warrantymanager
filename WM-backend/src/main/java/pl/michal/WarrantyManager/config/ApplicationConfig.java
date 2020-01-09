package pl.michal.WarrantyManager.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableJpaAuditing
@EnableSwagger2
public class ApplicationConfig {



}
