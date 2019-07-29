package com.github.cobrijani.sententia.domain;

import org.neo4j.ogm.annotation.RelationshipEntity;

@RelationshipEntity(type = "BLOCKED")
public class Block extends Relationship {

}
