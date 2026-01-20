package com.example.portpilot.domain.job.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QJobApplication is a Querydsl query type for JobApplication
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QJobApplication extends EntityPathBase<JobApplication> {

    private static final long serialVersionUID = -1189599349L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QJobApplication jobApplication = new QJobApplication("jobApplication");

    public final com.example.portpilot.global.common.QBaseEntity _super = new com.example.portpilot.global.common.QBaseEntity(this);

    public final DateTimePath<java.time.LocalDateTime> appliedAt = createDateTime("appliedAt", java.time.LocalDateTime.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final StringPath createdBy = _super.createdBy;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QJobPosition jobPosition;

    //inherited
    public final StringPath modifiedBy = _super.modifiedBy;

    public final StringPath status = createString("status");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.example.portpilot.domain.user.QUser user;

    public QJobApplication(String variable) {
        this(JobApplication.class, forVariable(variable), INITS);
    }

    public QJobApplication(Path<? extends JobApplication> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QJobApplication(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QJobApplication(PathMetadata metadata, PathInits inits) {
        this(JobApplication.class, metadata, inits);
    }

    public QJobApplication(Class<? extends JobApplication> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.jobPosition = inits.isInitialized("jobPosition") ? new QJobPosition(forProperty("jobPosition"), inits.get("jobPosition")) : null;
        this.user = inits.isInitialized("user") ? new com.example.portpilot.domain.user.QUser(forProperty("user")) : null;
    }

}

