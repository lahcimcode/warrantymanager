package pl.michal.WarrantyManager.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtTokenService {

    final int tokenExpirationTime = 5 * 60 * 1000; // 5 minutes
    final String tokenKey = "ut1FfO9sSPjG1OKxVh";

    public String generateToken(Claims claims, String email) {
        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setClaims(claims)
                .setSubject(email)
                .setExpiration(new Date((System.currentTimeMillis() + tokenExpirationTime)))
                .signWith(SignatureAlgorithm.HS512, tokenKey)
                .compact();
    }

    public void verifyToken(String token) throws JwtException {
        Jwts.parser().setSigningKey(tokenKey).parse(token.substring(7));
    }

    public Claims getClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(tokenKey).parseClaimsJws(token.substring(7)).getBody();
    }

    public String updateExpirationDateToken(String token) {

        Claims claims = getClaimsFromToken(token);

        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setClaims(claims)
                .setExpiration(new Date((System.currentTimeMillis() + tokenExpirationTime)))
                .signWith(SignatureAlgorithm.HS512, tokenKey)
                .compact();
    }

}



