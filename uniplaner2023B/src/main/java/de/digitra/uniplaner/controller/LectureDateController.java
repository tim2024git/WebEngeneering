package de.digitra.uniplaner.controller;

import de.digitra.uniplaner.domain.LectureDate;
import de.digitra.uniplaner.interfaces.ILectureDateController;
import de.digitra.uniplaner.service.LectureDateService;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;



@RestController
@RequestMapping("/lecturedates")
public class LectureDateController implements ILectureDateController {

    private final Logger log = LoggerFactory.getLogger(LectureDateController.class);
    private final String ENTITY_NAME = "LectureDate";

    private final LectureDateService lecturedateService;

    public LectureDateController(LectureDateService lecturedateService) {
        this.lecturedateService = lecturedateService;
    }


    @Override
    public ResponseEntity<LectureDate> createLectureDate(LectureDate lecturedate) throws BadRequestException {
        return null;
    }

    @Override
    public ResponseEntity<LectureDate> updateLectureDate(LectureDate lecturedate) throws BadRequestException {
        return null;
    }

    @Override
    public ResponseEntity<LectureDate> updateLectureDate(Long id, LectureDate lecturedateDetails) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public ResponseEntity<List<LectureDate>> getAlllecturedates() {
        return null;
    }

    @Override
    public ResponseEntity<LectureDate> getLectureDate(Long id) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public ResponseEntity<Void> deleteLectureDate(Long id) {
        return null;
    }
}
