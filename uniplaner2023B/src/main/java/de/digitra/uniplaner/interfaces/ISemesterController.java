package de.digitra.uniplaner.interfaces;

import de.digitra.uniplaner.domain.Semester;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

public interface ISemesterController {
    /**
     * {@code POST  /semesters} : Methode erstellt eine Ressource vom Typ Semester.
     *
     * @param semester Instanz von Semester, die am Server erstellt werden soll.
     * @return Eine {@link ResponseEntity} mit Status Code {@code 200 (OK)} und im Body die erstellte Ressource.
     * @throws BadRequestException falls semester nicht zulässig ist.
     */
    @PostMapping
    ResponseEntity<Semester> createSemester(@RequestBody Semester semester) throws BadRequestException;

    /**
     * {@code PUT  /semesters} : aktualisiert eine existierende Ressource vom Typ Semester.
     *
     * @param semester Instanz von Semester, die am Server aktualisiert werden soll.
     *                 Diese Instanz enthält die aktuellen Werte.
     * @return Eine {@link ResponseEntity} mit Status Code {@code 200 (OK)} and im Body die aktualisierte Ressource.
     * @throws BadRequestException wird ausgelöst, falls semester nicht zulässig ist.
     */
    @PutMapping
    ResponseEntity<Semester> updateSemester(@RequestBody Semester semester) throws BadRequestException;

    /**
     * {@code PUT  /semesters/:id} : aktualisiert eine existierende Ressource vom Typ Semester.
     *
     * @param id              Id der Ressource vom Typ Semester, die am Server aktualisiert werden soll.
     * @param semesterDetails Instanz von Semester, die am Server aktualisiert werden soll.
     *                        Diese Instanz enthält die aktuellen Werte.
     * @return Eine {@link ResponseEntity} mit Status Code {@code 200 (OK)} and im Body die aktualisierte Ressource.
     * @throws ResourceNotFoundException wird ausgelöst, falls die Ressource mit der angegebenen Id nicht gefunden werden konnte.
     */
    @PutMapping("/{id}")
    ResponseEntity<Semester> updateSemester(@PathVariable(value = "id") Long id, @Valid @RequestBody Semester semesterDetails) throws ResourceNotFoundException;

    /**
     * {@code GET  /semesters} : Liefert eine Liste aller am Server gespeicherten Ressourcen vom Typ Semester.
     *
     * @return Eine {@link ResponseEntity} mit Status Code {@code 200 (OK)} and im Body eine Liste von Ressourcen vom Typ Semester.
     */
    @GetMapping
    ResponseEntity<List<Semester>> getAllsemesters();

    /**
     * {@code GET  /semesters/:id} : Liefert die Ressource vom Typ Semester mit der angegebenen Id zurück.
     *
     * @param id Die Id der Ressource vom Typ Semester, die abgerufen werden soll.
     * @return Eine {@link ResponseEntity} mit Status Code {@code 200 (OK)} und im Body die gesuchte Ressource vom Typ Semester.
     * @throws ResourceNotFoundException wird ausgelöst, falls die Ressource mit der angegebenen Id nicht gefunden werden konnte.
     */
    @GetMapping("/{id}")
    ResponseEntity<Semester> getSemester(@PathVariable Long id) throws ResourceNotFoundException;

    /**
     * {@code DELETE  /semesters/:id} : Mit dieser Methode eine Ressource mit der angegebenen Id gelöscht.
     *
     * @param id Die Id der Ressource vom Typ Semester, die gelöscht werden soll.
     * @return Eine {@link ResponseEntity} mit Status Code {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteSemester(@PathVariable Long id);
}
