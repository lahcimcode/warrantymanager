package pl.michal.WarrantyManager.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import pl.michal.WarrantyManager.service.MailService;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class MailServiceImpl implements MailService {

    private JavaMailSender javaMailSender;

    @Autowired
    public MailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void sendActivationEmail(String email, String activationCode) {
//        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
//        try {
//            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, 1,"UTF-8");
//            mimeMessageHelper.setFrom("no-reply@warrantymanager.pl");
//            mimeMessageHelper.setTo(email);
//            mimeMessageHelper.setSubject("Confirm your Account - WarrantyManager");
//            mimeMessageHelper.setText("PlainText Activation code", "<p>Activation Code</p>");
//        } catch (MessagingException e) {
//            System.out.println("Exception: " + e);;
//        }


    }

}
