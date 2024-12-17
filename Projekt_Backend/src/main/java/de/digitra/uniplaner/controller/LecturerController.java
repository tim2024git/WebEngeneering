package de.digitra.uniplaner.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.digitra.uniplaner.domain.Lecturer;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.DuplicateEmailException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import de.digitra.uniplaner.interfaces.ILecturerController;
import de.digitra.uniplaner.service.LecturerService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/lecturers")
public class LecturerController implements ILecturerController {

    private final Logger log = LoggerFactory.getLogger(LecturerController.class);
    private final String ENTITY_NAME = "Lecturer";

    private final LecturerService lecturerService;

    public LecturerController(LecturerService lecturerService) {
        this.lecturerService = lecturerService;
    }

    @Override
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Bei einer erfolgreichen Ausführung wird eine ResponseEntity mit Status Code 200 (OK) und im Body die erstellte Instanz von Lecturer zurückgeliefert."),
        @ApiResponse(responseCode = "400", description = "Status Code 400 (Bad Request) wird zurückgeliefert, falls der übergebene Parameter lecturer nicht zulässig ist. Dies ist der Fall, falls er bereits eine Id hat, die nicht null ist."),
        @ApiResponse(responseCode = "409", description = "Status Code 409 (Conflict) wird zurückgeliefert, falls die E-Mail-Adresse bereits existiert.")
    })
    @PostMapping
    public ResponseEntity<Lecturer> createLecturer(@Valid @RequestBody Lecturer lecturer) throws BadRequestException, DuplicateEmailException {
        log.debug("REST request to save Lecturer : {}", lecturer);
        if (lecturer.getId() != null) {
            throw new BadRequestException("A new lecturer cannot already have an ID: " + ENTITY_NAME);
        }
        
        Lecturer result = lecturerService.save(lecturer);
        return ResponseEntity.ok(result);
    }

    @Override
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Bei einer erfolgreichen Ausführung wird eine ResponseEntity mit Status Code 200 (OK) und im Body die aktualisierte Instanz von Lecturer zurückgeliefert."),
        @ApiResponse(responseCode = "400", description = "Status Code 400 (Bad Request) wird zurückgeliefert, falls der übergebene Parameter lecturer nicht zulässig ist. Dies ist der Fall, falls er eine Id mit dem Wert null hat."),
        @ApiResponse(responseCode = "500", description = "Der Status Code 500 (Internal Server Error) wird zurückgeliefert, falls die Ressource nicht aktualisiert werden konnte.")
    })
    @PutMapping
    public ResponseEntity<Lecturer> updateLecturer(@Valid @RequestBody Lecturer lecturer) throws BadRequestException {
        log.debug("REST request to update Lecturer : {}", lecturer);
        if (lecturer.getId() == null) {
            throw new BadRequestException("Invalid id: " + ENTITY_NAME);
        }
        Lecturer result = lecturerService.save(lecturer);
        return ResponseEntity.ok().body(result);
    }

    @Override
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Bei einer erfolgreichen Ausführung wird eine ResponseEntity mit Status Code 200 (OK) und im Body die aktualisierte Ressource zurückgeliefert."),
        @ApiResponse(responseCode = "404", description = "Status Code 404 (Not Found) wird zurückgeliefert, falls die Ressource mit der angegebenen Id nicht gefunden werden konnte.")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Lecturer> updateLecturer(@PathVariable(value = "id") Long id, @Valid @RequestBody Lecturer lecturerDetails) throws ResourceNotFoundException {
        Optional<Lecturer> lecturer = lecturerService.findOne(id);
        if (lecturer.isPresent()) {
            lecturerDetails.setId(id);
            Lecturer result = lecturerService.save(lecturerDetails);
            return ResponseEntity.ok(result);
        } else {
            throw new ResourceNotFoundException("Lecturer with this id not found: " + id);
        }
    }

    @Override
    @GetMapping
    public ResponseEntity<List<Lecturer>> getAlllecturers() {
        log.debug("REST request to get all lecturers");
        return ResponseEntity.ok(lecturerService.findAll());
    }

    @Override
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Bei einer erfolgreichen Ausführung wird eine ResponseEntity mit Status Code 200 (OK) und im Body die gesuchte Ressource vom Typ Lecturer zurückgeliefert."),
        @ApiResponse(responseCode = "404", description = "Status Code 404 (Not Found) wird zurückgeliefert, falls die Ressource mit der angegebenen Id nicht gefunden werden konnte.")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Lecturer> getLecturer(@PathVariable Long id) throws ResourceNotFoundException {
        log.debug("REST request to get Lecturer : {}", id);
        Optional<Lecturer> lecturer = lecturerService.findOne(id);
        if (lecturer.isPresent()) {
            return ResponseEntity.ok(lecturer.get());
        } else {
            throw new ResourceNotFoundException("Lecturer with this id not found: " + id);
        }
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLecturer(@PathVariable Long id) {
        log.debug("REST request to delete Lecturer : {}", id);
        lecturerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}