package com.tawin.tawinmanagementsystem.controller;

import java.util.Calendar;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.TimeZone;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.tawin.tawinmanagementsystem.entity.ERole;
import com.tawin.tawinmanagementsystem.entity.Employee;
import com.tawin.tawinmanagementsystem.entity.LoginRequest;
import com.tawin.tawinmanagementsystem.entity.Role;
import com.tawin.tawinmanagementsystem.entity.SignupRequest;
import com.tawin.tawinmanagementsystem.repository.EmployeeRepository;
import com.tawin.tawinmanagementsystem.repository.RoleRepository;
import com.tawin.tawinmanagementsystem.respone.JwtResponse;
import com.tawin.tawinmanagementsystem.respone.MessageResponse;
import com.tawin.tawinmanagementsystem.security.JwtUtils;
import com.tawin.tawinmanagementsystem.service.UserDetailsImpl;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
  @Autowired
  AuthenticationManager authenticationManagerBean;

  @Autowired
  EmployeeRepository empRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManagerBean.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();    
    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    return ResponseEntity.ok(new JwtResponse(jwt, 
                         userDetails.getId(), 
                         userDetails.getUsername(),
                         userDetails.getPhone(),
                         userDetails.getName_Emp(),
                         userDetails.getAddress(),
                         userDetails.getLine(),
                         userDetails.getImage(),
                         roles));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (empRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Username is already taken!"));
    }
    
    Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Asia/Bangkok"));
   	int hours = calendar.get(Calendar.HOUR_OF_DAY);
   	int minutes = calendar.get(Calendar.MINUTE);
   	int sec = calendar.get(Calendar.SECOND);
   	int day = calendar.get(Calendar.DAY_OF_MONTH);
   	int month = calendar.get(Calendar.MONTH);
   	int year = calendar.get(Calendar.YEAR);
   	String datetime = "D" + day + "-" + month + "-" + year + "-T" + hours + "." + minutes + "." + sec;
   	signUpRequest.setImage(datetime + ".jpg");
   

    

    // Create new user's account
    Employee emp = new Employee(
    			signUpRequest.getUsername(), 
               encoder.encode(signUpRequest.getPassword()),
            		   signUpRequest.getName_Emp(),
            		   signUpRequest.getPhone(),
            		   signUpRequest.getAddress(),
            		   signUpRequest.getImage(),
            		   signUpRequest.getLine()
            		   );
    
    

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
        case "admin":
          Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(adminRole);

          break;
        case "cook":
          Role modRole = roleRepository.findByName(ERole.ROLE_COOK)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(modRole);

          break;
        default:
          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(userRole);
        }
      });
    }

    emp.setRoles(roles);
    empRepository.save(emp);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }
}
