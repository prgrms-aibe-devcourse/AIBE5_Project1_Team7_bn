package com.example.portpilot.domain.resume.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QResume is a Querydsl query type for Resume
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QResume extends EntityPathBase<Resume> {

    private static final long serialVersionUID = -1610744359L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QResume resume = new QResume("resume");

    public final com.example.portpilot.global.common.QBaseTimeEntity _super = new com.example.portpilot.global.common.QBaseTimeEntity(this);

    public final ListPath<Career, QCareer> careers = this.<Career, QCareer>createList("careers", Career.class, QCareer.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final ListPath<Education, QEducation> educations = this.<Education, QEducation>createList("educations", Education.class, QEducation.class, PathInits.DIRECT2);

    public final ListPath<Experience, QExperience> experiences = this.<Experience, QExperience>createList("experiences", Experience.class, QExperience.class, PathInits.DIRECT2);

    public final StringPath highlights = createString("highlights");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath industry = createString("industry");

    public final StringPath position = createString("position");

    public final ListPath<ResumeSection, QResumeSection> sections = this.<ResumeSection, QResumeSection>createList("sections", ResumeSection.class, QResumeSection.class, PathInits.DIRECT2);

    public final EnumPath<ResumeStatus> status = createEnum("status", ResumeStatus.class);

    public final StringPath targetCompany = createString("targetCompany");

    public final StringPath title = createString("title");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.example.portpilot.domain.user.QUser user;

    public QResume(String variable) {
        this(Resume.class, forVariable(variable), INITS);
    }

    public QResume(Path<? extends Resume> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QResume(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QResume(PathMetadata metadata, PathInits inits) {
        this(Resume.class, metadata, inits);
    }

    public QResume(Class<? extends Resume> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.example.portpilot.domain.user.QUser(forProperty("user")) : null;
    }

}

