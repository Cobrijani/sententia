package com.github.cobrijani.sententia.domain;

import java.util.List;

import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

@NodeEntity
public class Person {

    @Id
    private String userId;

    private int numFollowers = 0;

    private int numFollowed = 0;

    @Relationship(type = "FOLLOWED")
    private List<Follow> follows;
    @Relationship(type = "MUTED")
    private List<Mute> mutes;
    @Relationship(type = "BLOCKED")
    private List<Block> blocks;
    @Relationship(type = "UNFOLLOWED")
    private List<Unfollow> unfollows;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getNumFollowers() {
		return numFollowers;
	}

	public void setNumFollowers(int numFollowers) {
		this.numFollowers = numFollowers;
	}

	public int getNumFollowed() {
		return numFollowed;
	}

	public void setNumFollowed(int numFollowed) {
		this.numFollowed = numFollowed;
	}

	public List<Follow> getFollows() {
		return follows;
	}

	public void setFollows(List<Follow> follows) {
		this.follows = follows;
	}

	public List<Mute> getMutes() {
		return mutes;
	}

	public void setMutes(List<Mute> mutes) {
		this.mutes = mutes;
	}

	public List<Block> getBlocks() {
		return blocks;
	}

	public void setBlocks(List<Block> blocks) {
		this.blocks = blocks;
	}

	public List<Unfollow> getUnfollows() {
		return unfollows;
	}

	public void setUnfollows(List<Unfollow> unfollows) {
		this.unfollows = unfollows;
	}



}
