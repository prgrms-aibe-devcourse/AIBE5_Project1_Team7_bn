package com.example.portpilot.domain.mentorRequest.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMentoringRequest is a Querydsl query type for MentoringRequest
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMentoringRequest extends EntityPathBase<MentoringRequest> {

    private static final long serialVersionUID = -78809513L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMentoringRequest mentoringRequest = new QMentoringRequest("mentoringRequest");

    public final com.example.portpilot.global.common.QBaseEntity _super = new com.example.portpilot.global.common.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final StringPath createdBy = _super.createdBy;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isBlocked = createBoolean("isBlocked");

    public final BooleanPath isCompleted = createBoolean("isCompleted");

    public final com.example.portpilot.domain.user.QUser mentor;

    public final StringPath mentorName = createString("mentorName");

    public final StringPath message = createString("message");

    //inherited
    public final StringPath modifiedBy = _super.modifiedBy;

    public final DateTimePath<java.time.LocalDateTime> proposedAt = createDateTime("proposedAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> proposedById = createNumber("proposedById", Long.class);

    public final BooleanPath scheduleConfirmed = createBoolean("scheduleConfirmed");

    public final DateTimePath<java.time.LocalDateTime> scheduledAt = createDateTime("scheduledAt", java.time.LocalDateTime.class);

    public final StringPath sessionUrl = createString("sessionUrl");

    public final EnumPath<MentoringStatus> status = createEnum("status", MentoringStatus.class);

    public final StringPath topic = createString("topic");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.example.portpilot.domain.user.QUser user;

    public final StringPath userName = createString("userName");

    public QMentoringRequest(String variable) {
        this(MentoringRequest.class, forVariable(variable), INITS);
    }

    public QMentoringRequest(Path<? extends MentoringRequest> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMentoringRequest(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMentoringRequest(PathMetadata metadata, PathInits inits) {
        this(MentoringRequest.class, metadata, inits);
    }

    public QMentoringRequest(Class<? extends MentoringRequest> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.mentor = inits.isInitialized("mentor") ? new com.example.portpilot.domain.user.QUser(forProperty("mentor")) : null;
        this.user = inits.isInitialized("user") ? new com.example.portpilot.domain.user.QUser(forProperty("user")) : null;
    }

}

