package com.example.portpilot.adminPage.report;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReport is a Querydsl query type for Report
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReport extends EntityPathBase<Report> {

    private static final long serialVersionUID = -972993002L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReport report = new QReport("report");

    public final com.example.portpilot.global.common.QBaseEntity _super = new com.example.portpilot.global.common.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final StringPath createdBy = _super.createdBy;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final StringPath modifiedBy = _super.modifiedBy;

    public final StringPath reason = createString("reason");

    public final com.example.portpilot.adminPage.admin.QAdmin reportAdmin;

    public final com.example.portpilot.domain.user.QUser reportedUser;

    public final com.example.portpilot.domain.user.QUser reporter;

    public final DateTimePath<java.time.LocalDateTime> resolvedAt = createDateTime("resolvedAt", java.time.LocalDateTime.class);

    public final EnumPath<ReportStatus> status = createEnum("status", ReportStatus.class);

    public final NumberPath<Long> targetId = createNumber("targetId", Long.class);

    public final EnumPath<ReportTargetType> targetType = createEnum("targetType", ReportTargetType.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QReport(String variable) {
        this(Report.class, forVariable(variable), INITS);
    }

    public QReport(Path<? extends Report> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReport(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReport(PathMetadata metadata, PathInits inits) {
        this(Report.class, metadata, inits);
    }

    public QReport(Class<? extends Report> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.reportAdmin = inits.isInitialized("reportAdmin") ? new com.example.portpilot.adminPage.admin.QAdmin(forProperty("reportAdmin")) : null;
        this.reportedUser = inits.isInitialized("reportedUser") ? new com.example.portpilot.domain.user.QUser(forProperty("reportedUser")) : null;
        this.reporter = inits.isInitialized("reporter") ? new com.example.portpilot.domain.user.QUser(forProperty("reporter")) : null;
    }

}

