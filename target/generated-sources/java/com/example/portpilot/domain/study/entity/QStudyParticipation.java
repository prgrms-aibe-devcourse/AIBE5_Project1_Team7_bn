package com.example.portpilot.domain.study.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStudyParticipation is a Querydsl query type for StudyParticipation
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStudyParticipation extends EntityPathBase<StudyParticipation> {

    private static final long serialVersionUID = 378670012L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStudyParticipation studyParticipation = new QStudyParticipation("studyParticipation");

    public final com.example.portpilot.global.common.QBaseEntity _super = new com.example.portpilot.global.common.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final StringPath createdBy = _super.createdBy;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final EnumPath<JobType> jobType = createEnum("jobType", JobType.class);

    //inherited
    public final StringPath modifiedBy = _super.modifiedBy;

    public final EnumPath<StudyApplyStatus> status = createEnum("status", StudyApplyStatus.class);

    public final QStudyRecruitment study;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.example.portpilot.domain.user.QUser user;

    public QStudyParticipation(String variable) {
        this(StudyParticipation.class, forVariable(variable), INITS);
    }

    public QStudyParticipation(Path<? extends StudyParticipation> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStudyParticipation(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStudyParticipation(PathMetadata metadata, PathInits inits) {
        this(StudyParticipation.class, metadata, inits);
    }

    public QStudyParticipation(Class<? extends StudyParticipation> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.study = inits.isInitialized("study") ? new QStudyRecruitment(forProperty("study"), inits.get("study")) : null;
        this.user = inits.isInitialized("user") ? new com.example.portpilot.domain.user.QUser(forProperty("user")) : null;
    }

}

