package pl.michal.WarrantyManager.service;

public interface MailService {

    void sendActivationEmail(String email, String activationCode);

}
