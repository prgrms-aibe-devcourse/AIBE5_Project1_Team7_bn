package com.example.portpilot.domain.mentorRequest.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMentorProfile is a Querydsl query type for MentorProfile
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMentorProfile extends EntityPathBase<MentorProfile> {

    private static final long serialVersionUID = -1730926657L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMentorProfile mentorProfile = new QMentorProfile("mentorProfile");

    public final com.example.portpilot.global.common.QBaseEntity _super = new com.example.portpilot.global.common.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final StringPath createdBy = _super.createdBy;

    public final StringPath description = createString("description");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final StringPath modifiedBy = _super.modifiedBy;

    public final StringPath techStack = createString("techStack");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.example.portpilot.domain.user.QUser user;

    public QMentorProfile(String variable) {
        this(MentorProfile.class, forVariable(variable), INITS);
    }

    public QMentorProfile(Path<? extends MentorProfile> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMentorProfile(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMentorProfile(PathMetadata metadata, PathInits inits) {
        this(MentorProfile.class, metadata, inits);
    }

    public QMentorProfile(Class<? extends MentorProfile> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.example.portpilot.domain.user.QUser(forProperty("user")) : null;
    }

}

