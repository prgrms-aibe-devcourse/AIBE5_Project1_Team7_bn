package com.example.portpilot.domain.resume.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QResumeSection is a Querydsl query type for ResumeSection
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QResumeSection extends EntityPathBase<ResumeSection> {

    private static final long serialVersionUID = 1229095628L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QResumeSection resumeSection = new QResumeSection("resumeSection");

    public final com.example.portpilot.global.common.QBaseTimeEntity _super = new com.example.portpilot.global.common.QBaseTimeEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QResume resume;

    public final EnumPath<SectionType> sectionType = createEnum("sectionType", SectionType.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final NumberPath<Integer> wordCount = createNumber("wordCount", Integer.class);

    public QResumeSection(String variable) {
        this(ResumeSection.class, forVariable(variable), INITS);
    }

    public QResumeSection(Path<? extends ResumeSection> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QResumeSection(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QResumeSection(PathMetadata metadata, PathInits inits) {
        this(ResumeSection.class, metadata, inits);
    }

    public QResumeSection(Class<? extends ResumeSection> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.resume = inits.isInitialized("resume") ? new QResume(forProperty("resume"), inits.get("resume")) : null;
    }

}

