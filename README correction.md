## Entity
package com.cwa.crudspringboot.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "persons")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "person_seq")
    @SequenceGenerator(name = "person_seq", sequenceName = "PERSON_SEQ", allocationSize = 1)
    private Long id;

    private String name;
    private String city;
    private String phoneNumber;

    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_generator")
    @SequenceGenerator(name = "sequence_generator", sequenceName = "SEQUENCE_PERSON", allocationSize = 1)
    private Long sequence;
}

# Version améliorée avec Lombok @Builder et la séquence Oracle
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
    @Transactional
    public List<Person> savePersons(PersonListDTO personListDTO) {
        List<Person> persons = personListDTO.getPersons().stream().map(dto -> Person.builder()
            .name(dto.getName())
            .city(dto.getCity())
            .phoneNumber(dto.getPhoneNumber())
            .build()
        ).collect(Collectors.toList());

        return personRepository.saveAll(persons);
    }
}

# 