package de.digitra.uniplaner.interfaces;

import java.util.List;
import java.util.Optional;

import de.digitra.uniplaner.domain.StudyProgram;

public interface IStudyProgramService {

    public StudyProgram save(StudyProgram studyprogram);

    public void delete(Long id);

    public List<StudyProgram> findAll();

    public Optional<StudyProgram> findOne(Long id);
}
