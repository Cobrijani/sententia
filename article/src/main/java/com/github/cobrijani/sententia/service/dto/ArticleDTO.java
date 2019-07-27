package com.github.cobrijani.sententia.service.dto;
import io.swagger.annotations.ApiModel;
import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.github.cobrijani.sententia.domain.enumeration.Markup;

/**
 * A DTO for the {@link com.github.cobrijani.sententia.domain.Article} entity.
 */
@ApiModel(description = "An Article written by certain author that contains some kind of content. @author Stefan Bratic")
public class ArticleDTO implements Serializable {

    private String id;

    @NotNull
    @Size(min = 1, max = 42)
    private String title;

    private Markup type;

    @NotNull
    private String category;

    @NotNull
    private String authorId;

    @NotNull
    private String authorName;

    private ZonedDateTime created;

    private ZonedDateTime modified;

    private ZonedDateTime published;

    
    private String content;

    private String releasedContent;

    @NotNull
    private String contentHash;

    private String releasedContentHash;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Markup getType() {
        return type;
    }

    public void setType(Markup type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public void setCreated(ZonedDateTime created) {
        this.created = created;
    }

    public ZonedDateTime getModified() {
        return modified;
    }

    public void setModified(ZonedDateTime modified) {
        this.modified = modified;
    }

    public ZonedDateTime getPublished() {
        return published;
    }

    public void setPublished(ZonedDateTime published) {
        this.published = published;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getReleasedContent() {
        return releasedContent;
    }

    public void setReleasedContent(String releasedContent) {
        this.releasedContent = releasedContent;
    }

    public String getContentHash() {
        return contentHash;
    }

    public void setContentHash(String contentHash) {
        this.contentHash = contentHash;
    }

    public String getReleasedContentHash() {
        return releasedContentHash;
    }

    public void setReleasedContentHash(String releasedContentHash) {
        this.releasedContentHash = releasedContentHash;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ArticleDTO articleDTO = (ArticleDTO) o;
        if (articleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), articleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ArticleDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", type='" + getType() + "'" +
            ", category='" + getCategory() + "'" +
            ", authorId='" + getAuthorId() + "'" +
            ", authorName='" + getAuthorName() + "'" +
            ", created='" + getCreated() + "'" +
            ", modified='" + getModified() + "'" +
            ", published='" + getPublished() + "'" +
            ", content='" + getContent() + "'" +
            ", releasedContent='" + getReleasedContent() + "'" +
            ", contentHash='" + getContentHash() + "'" +
            ", releasedContentHash='" + getReleasedContentHash() + "'" +
            "}";
    }
}
