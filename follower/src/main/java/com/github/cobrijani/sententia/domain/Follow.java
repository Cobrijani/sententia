package com.github.cobrijani.sententia.domain;

import org.neo4j.ogm.annotation.RelationshipEntity;

@RelationshipEntity(type = "FOLLOWED")
public class Follow extends Relationship {

}
