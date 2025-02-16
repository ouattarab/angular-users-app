Entity Person
---------
package com.cwa.crudspringboot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "persons")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "person_seq")
    @SequenceGenerator(name = "person_seq", sequenceName = "PERSON_SEQ", allocationSize = 1)
    private Long id;

    private String name;
    private String city;
    private String phoneNumber;
    private Long sequence;
}
--
PERSON_SEQ
--
CREATE SEQUENCE PERSON_SEQ START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;
---
PersonDTO
---
package com.cwa.crudspringboot.dto;

import lombok.Data;
import java.util.List;

@Data
public class PersonListDTO {
    private List<PersonDTO> persons;
}

@Data
public class PersonDTO {
    private String name;
    private String city;
    private String phoneNumber;
}
-----
Explication :

    PersonDTO contient les champs qu'on veut envoyer dans la requête.
    PersonListDTO permet d'encapsuler une liste de PersonDTO (pour le POST).
-----

--
PersonRepository
--
package com.cwa.crudspringboot.repository;

import com.cwa.crudspringboot.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
}

--
PersonService
--
package com.cwa.crudspringboot.service;

import com.cwa.crudspringboot.dto.PersonListDTO;
import com.cwa.crudspringboot.entity.Person;

import java.util.List;

public interface PersonService {
    List<Person> savePersons(PersonListDTO personListDTO);
}

--
PersonServiceImpl
--
package com.cwa.crudspringboot.service.impl;

import com.cwa.crudspringboot.dto.PersonDTO;
import com.cwa.crudspringboot.dto.PersonListDTO;
import com.cwa.crudspringboot.entity.Person;
import com.cwa.crudspringboot.repository.PersonRepository;
import com.cwa.crudspringboot.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepository;

    @Override
    @Transactional  // Pour garantir que toutes les personnes ont la même séquence
    public List<Person> savePersons(PersonListDTO personListDTO) {
        // Générer une séquence unique
        Long sequenceValue = System.currentTimeMillis(); // Alternative à une séquence Oracle

        List<Person> persons = personListDTO.getPersons().stream().map(dto -> {
            Person person = new Person();
            person.setName(dto.getName());
            person.setCity(dto.getCity());
            person.setPhoneNumber(dto.getPhoneNumber());
            person.setSequence(sequenceValue);
            return person;
        }).collect(Collectors.toList());

        return personRepository.saveAll(persons);
    }
}

---
PersonController
---

package com.cwa.crudspringboot.controller;

import com.cwa.crudspringboot.dto.PersonListDTO;
import com.cwa.crudspringboot.entity.Person;
import com.cwa.crudspringboot.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/persons")
@RequiredArgsConstructor
public class PersonController {

    private final PersonService personService;

    @PostMapping("/batch")
    public ResponseEntity<List<Person>> savePersons(@RequestBody PersonListDTO personListDTO) {
        List<Person> savedPersons = personService.savePersons(personListDTO);
        return ResponseEntity.ok(savedPersons);
    }
}
