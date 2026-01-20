package com.example.portpilot.domain.job.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QJobPosition is a Querydsl query type for JobPosition
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QJobPosition extends EntityPathBase<JobPosition> {

    private static final long serialVersionUID = -790292274L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QJobPosition jobPosition = new QJobPosition("jobPosition");

    public final com.example.portpilot.global.common.QBaseEntity _super = new com.example.portpilot.global.common.QBaseEntity(this);

    public final com.example.portpilot.domain.company.entity.QCompany company;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final StringPath createdBy = _super.createdBy;

    public final DateTimePath<java.time.LocalDateTime> deadline = createDateTime("deadline", java.time.LocalDateTime.class);

    public final StringPath description = createString("description");

    public final StringPath experienceLevel = createString("experienceLevel");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath location = createString("location");

    //inherited
    public final StringPath modifiedBy = _super.modifiedBy;

    public final StringPath requirements = createString("requirements");

    public final StringPath salary = createString("salary");

    public final StringPath status = createString("status");

    public final StringPath title = createString("title");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QJobPosition(String variable) {
        this(JobPosition.class, forVariable(variable), INITS);
    }

    public QJobPosition(Path<? extends JobPosition> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QJobPosition(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QJobPosition(PathMetadata metadata, PathInits inits) {
        this(JobPosition.class, metadata, inits);
    }

    public QJobPosition(Class<? extends JobPosition> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.company = inits.isInitialized("company") ? new com.example.portpilot.domain.company.entity.QCompany(forProperty("company")) : null;
    }

}

