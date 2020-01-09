package pl.michal.WarrantyManager.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.michal.WarrantyManager.service.MailService;

import javax.persistence.PostPersist;

@Component
public class UserAuditing {

    private MailService mailService;

    @Autowired
    public UserAuditing (MailService mailService) {
        this.mailService = mailService;
    }

    /** Sending email with activation code */
    @PostPersist
    public void postPersist(User user) {
        System.out.println("PostPersist in UserAuditing.class");
        System.out.println(user.getEmail());
        System.out.println(user.getId());

//        Executors.newSingleThreadExecutor()
//                .submit(() -> mailService.sendActivationEmail(user.getEmail(), user.getActivationCode()));
    }

}
