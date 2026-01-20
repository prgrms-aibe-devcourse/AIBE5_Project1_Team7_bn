package com.example.portpilot.domain.study.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStudyTechStack is a Querydsl query type for StudyTechStack
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStudyTechStack extends EntityPathBase<StudyTechStack> {

    private static final long serialVersionUID = 9613709L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStudyTechStack studyTechStack = new QStudyTechStack("studyTechStack");

    public final com.example.portpilot.global.common.QBaseEntity _super = new com.example.portpilot.global.common.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final StringPath createdBy = _super.createdBy;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final EnumPath<JobType> jobType = createEnum("jobType", JobType.class);

    //inherited
    public final StringPath modifiedBy = _super.modifiedBy;

    public final QStudyRecruitment study;

    public final StringPath techStack = createString("techStack");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QStudyTechStack(String variable) {
        this(StudyTechStack.class, forVariable(variable), INITS);
    }

    public QStudyTechStack(Path<? extends StudyTechStack> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStudyTechStack(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStudyTechStack(PathMetadata metadata, PathInits inits) {
        this(StudyTechStack.class, metadata, inits);
    }

    public QStudyTechStack(Class<? extends StudyTechStack> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.study = inits.isInitialized("study") ? new QStudyRecruitment(forProperty("study"), inits.get("study")) : null;
    }

}

